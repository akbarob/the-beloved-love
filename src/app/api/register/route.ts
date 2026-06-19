import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSanityWriteClient } from '@/lib/sanity';

/**
 * Derive initials from a full name — up to first 2 words, first letter each, uppercased.
 * e.g. "Akbar Opemipo Badmus" → "AO", "John Doe" → "JD", "Madonna" → "MA"
 */
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'XX';
  if (parts.length === 1) {
    // Single name — use first two letters
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Generate access code: {INITIALS}-{SERIAL}-LHBR
 * e.g. "AO-001-LHBR", "JD-042-LHBR", "MA-1000-LHBR"
 * Serial is derived from the current count of existing registrations + 1.
 */
async function generateAccessCode(fullName: string): Promise<string> {
  const client = getSanityWriteClient();

  // Count existing registrations to determine serial number
  const count: number = await client.fetch(
    `count(*[_type == "eventRegistration"])`
  );

  const serial = count + 1;
  // Pad to 3 digits minimum, grows naturally beyond 999 → 1000
  const serialStr = serial < 1000 ? String(serial).padStart(3, '0') : String(serial);

  const initials = getInitials(fullName);
  return `${initials}${serialStr}LHBR`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const {
    fullName,
    gender,
    ageRange,
    phone,
    email,
    address,
    occupation,
    church,
    churchPosition,
    updatePreference,
    countdownReminders,
    whatsappCommunity,
    photoConsent,
    declaration,
  } = body;

  // ── Validate required fields ───────────────────────────────────────────────
  if (!fullName?.trim() || !gender || !ageRange || !phone?.trim() || !email?.trim() || !address?.trim() || !photoConsent || !declaration) {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
  }

  if (declaration !== 'agree') {
    return NextResponse.json({ error: 'You must agree to the declaration to register.' }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const adminEmail = process.env.CONTACT_TO_EMAIL ?? '144hours.mandate@tblinitiative.org';

  // ── Generate access code (queries Sanity for serial count) ────────────────
  let accessCode: string;
  try {
    accessCode = await generateAccessCode(fullName);
  } catch (err) {
    console.error('Access code generation error:', err);
    return NextResponse.json({ error: 'Failed to generate access code. Please try again.' }, { status: 500 });
  }

  // QR encodes a check-in URL so scanning goes straight to the staff lookup page
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tblinitiative.org';
  const qrPayload = `${siteUrl}/checkin?code=${accessCode}`;

  // ── Save registration to Sanity ────────────────────────────────────────────
  try {
    await getSanityWriteClient().create({
      _type: 'eventRegistration',
      fullName: fullName.trim(),
      gender,
      ageRange,
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      address: address.trim(),
      occupation: occupation?.trim() || undefined,
      church: church?.trim() || undefined,
      churchPosition: churchPosition?.trim() || undefined,
      updatePreference: updatePreference || undefined,
      countdownReminders: countdownReminders || undefined,
      whatsappCommunity: whatsappCommunity || undefined,
      photoConsent,
      accessCode,
      status: 'registered',
      registeredAt: new Date().toISOString(),
    });
  } catch (sanityErr) {
    console.error('Sanity write error:', sanityErr);
    return NextResponse.json({ error: 'Failed to save registration. Please try again.' }, { status: 500 });
  }

  // ── Confirmation email to registrant ──────────────────────────────────────
  const confirmHtml = `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f0e8; border-radius: 12px;">

  <div style="text-align: center; margin-bottom: 32px;">
    <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #b8960c; margin: 0 0 6px;">The Beloved Love Initiative</p>
    <h1 style="font-family: Georgia, serif; font-size: 28px; color: #2e3328; margin: 0 0 4px; font-style: italic;">Registration Confirmed</h1>
    <p style="font-size: 14px; color: #4a5240; margin: 0;">Guinness World Record Attempt — World's Longest Bible Reading Marathon</p>
    <div style="width: 40px; height: 2px; background: #d4af37; margin: 16px auto 0;"></div>
  </div>

  <p style="font-size: 16px; color: #4a5240; line-height: 1.8; margin-bottom: 8px;">
    Dear ${fullName},
  </p>
  <p style="font-size: 16px; color: #4a5240; line-height: 1.8; margin-bottom: 24px;">
    Your registration has been received. We are honoured to have you join us for this momentous occasion.
  </p>

  <div style="background: #2e3328; border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 28px;">
    <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #d4af37; margin: 0 0 10px;">Your Access Code</p>
    <p style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: bold; color: #f5f0e8; letter-spacing: 6px; margin: 0 0 12px;">${accessCode}</p>
    <p style="font-size: 12px; color: #9a9a8a; margin: 0;">Keep this code safe — it is your entry pass to the event.</p>
  </div>

  <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e8e2d8; margin-bottom: 24px;">
    <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #6a6a5a; margin: 0 0 12px;">What to do</p>
    <ul style="font-size: 14px; color: #4a5240; line-height: 2; padding-left: 18px; margin: 0;">
      <li>Screenshot or write down your access code above.</li>
      <li>Present your code (or QR code from the confirmation page) at the event entrance.</li>
      <li>The code can be scanned or entered manually by event staff.</li>
    </ul>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; width: 160px;">Name</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 14px;">${fullName}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Email</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 14px;">${email}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Phone</td>
      <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 14px;">${phone}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Access Code</td>
      <td style="padding: 8px 0; color: #2e3328; font-size: 14px; font-family: 'Courier New', monospace; font-weight: bold;">${accessCode}</td>
    </tr>
  </table>

  <div style="border-top: 1px solid #d4af37; padding-top: 24px; text-align: center;">
    <p style="font-size: 13px; color: #6a6a5a; font-style: italic; margin: 0 0 8px;">
      Discovering Purpose. Restoring Identity. Awakening Love. Transforming Lives.
    </p>
    <p style="font-size: 12px; color: #9a9a8a; margin: 0;">The Beloved Love Initiative</p>
  </div>
</div>
  `.trim();

  // ── Admin notification ─────────────────────────────────────────────────────
  const adminHtml = `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f0e8; border-radius: 12px;">
  <div style="text-align: center; margin-bottom: 28px;">
    <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #b8960c; margin: 0;">TBLI — New Registration</p>
    <h1 style="font-size: 24px; color: #2e3328; margin: 8px 0 0;">Bible Reading Marathon</h1>
    <div style="width: 40px; height: 2px; background: #d4af37; margin: 12px auto 0;"></div>
  </div>
  <table style="width: 100%; border-collapse: collapse;">
    ${[
      ['Full Name', fullName],
      ['Email', email],
      ['Phone', phone],
      ['Gender', gender],
      ['Age Range', ageRange],
      ['Address / City', address],
      ['Occupation', occupation || '—'],
      ['Church / Ministry', church || '—'],
      ['Position', churchPosition || '—'],
      ['Update Preference', updatePreference || '—'],
      ['Countdown Reminders', countdownReminders || '—'],
      ['WhatsApp Community', whatsappCommunity || '—'],
      ['Photo Consent', photoConsent],
      ['Access Code', accessCode],
    ]
      .map(
        ([label, value]) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; width: 180px;">${label}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 14px;">${value}</td>
      </tr>`
      )
      .join('')}
  </table>
</div>
  `.trim();

  // ── Send emails ────────────────────────────────────────────────────────────
  try {
    const { error: confErr } = await resend.emails.send({
      from: '144Hours Mandate <144hours.mandate@tblinitiative.org>',
      to: email,
      subject: `Your Registration Access Code — ${accessCode}`,
      html: confirmHtml,
    });

    if (confErr) {
      console.error('Resend confirmation error:', confErr);
      // Registration was already saved — don't fail, still return success with code
    }

    // Admin notification — best-effort
    try {
      await resend.emails.send({
        from: '144Hours Mandate <144hours.mandate@tblinitiative.org>',
        to: adminEmail,
        subject: `[New Registration] ${fullName} — ${accessCode}`,
        html: adminHtml,
      });
    } catch (adminErr) {
      console.warn('Admin notification failed:', adminErr);
    }

    return NextResponse.json({ success: true, accessCode, qrPayload });
  } catch (err) {
    console.error('Register route error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
