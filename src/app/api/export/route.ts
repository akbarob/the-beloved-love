import { NextRequest, NextResponse } from 'next/server';
import { getSanityWriteClient } from '@/lib/sanity';

/** Escape a CSV cell value — wraps in quotes if needed */
function csvCell(value: string | undefined | null): string {
  const str = value ?? '';
  // If contains comma, quote, or newline — wrap in double quotes and escape internal quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: NextRequest) {
  // PIN-protect the export
  const { searchParams } = new URL(req.url);
  const pin = searchParams.get('pin');
  const staffPin = process.env.CHECKIN_STAFF_PIN;

  if (!staffPin || pin !== staffPin) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const registrations = await getSanityWriteClient().fetch(
      `*[_type == "eventRegistration"] | order(registeredAt asc) {
        accessCode,
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
        status,
        registeredAt
      }`
    );

    // ── Build CSV ────────────────────────────────────────────────────────────
    const headers = [
      'Access Code',
      'Full Name',
      'Gender',
      'Age Range',
      'Phone',
      'Email',
      'Address / City',
      'Occupation',
      'Church / Ministry',
      'Position',
      'Update Preference',
      'Countdown Reminders',
      'WhatsApp Community',
      'Photo Consent',
      'Status',
      'Registered At',
      'Checked In',   // blank column for manual check-in on paper
    ];

    const rows = registrations.map((r: Record<string, string>) => [
      csvCell(r.accessCode),
      csvCell(r.fullName),
      csvCell(r.gender),
      csvCell(r.ageRange),
      csvCell(r.phone),
      csvCell(r.email),
      csvCell(r.address),
      csvCell(r.occupation),
      csvCell(r.church),
      csvCell(r.churchPosition),
      csvCell(r.updatePreference),
      csvCell(r.countdownReminders),
      csvCell(r.whatsappCommunity),
      csvCell(r.photoConsent),
      csvCell(r.status),
      csvCell(r.registeredAt
        ? new Date(r.registeredAt).toLocaleString('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
          })
        : ''),
      '', // blank "Checked In" column for manual use
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\r\n');

    const date = new Date().toISOString().slice(0, 10);
    const filename = `144hours-registrations-${date}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('Export error:', err);
    return NextResponse.json({ error: 'Export failed. Please try again.' }, { status: 500 });
  }
}
