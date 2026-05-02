import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, subject, message, email } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, email, and message are required.' },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@thebelovedlove.org';

    const { error } = await resend.emails.send({
      from: 'The Beloved Love Initiative <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: subject ? `[TBLI Contact] ${subject}` : `[TBLI Contact] Message from ${firstName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f0e8; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #b8960c; margin: 0;">The Beloved Love Initiative</p>
            <h1 style="font-size: 28px; color: #2e3328; margin: 8px 0 0;">New Message</h1>
            <div style="width: 40px; height: 2px; background: #d4af37; margin: 12px auto 0;"></div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 15px;">${firstName} ${lastName ?? ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 15px;"><a href="mailto:${email}" style="color: #4a5240;">${email}</a></td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; color: #6a6a5a; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8e2d8; color: #2e3328; font-size: 15px;">${subject}</td>
            </tr>` : ''}
          </table>

          <div style="background: white; border-radius: 8px; padding: 24px; border: 1px solid #e8e2d8;">
            <p style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #6a6a5a; margin: 0 0 12px;">Message</p>
            <p style="font-size: 16px; color: #2e3328; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="text-align: center; font-size: 11px; color: #9a9a8a; margin-top: 32px; font-style: italic;">
            Sent via thebelovedlove.org contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    // Send auto-reply to the sender (only works once domain is verified)
    try {
      await resend.emails.send({
        from: 'The Beloved Love Initiative <onboarding@resend.dev>',
        to: email,
        subject: 'We received your message — The Beloved Love Initiative',
        html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f5f0e8; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #b8960c; margin: 0;">The Beloved Love Initiative</p>
            <h1 style="font-size: 26px; color: #2e3328; margin: 8px 0 0; font-style: italic;">Thank you, ${firstName}.</h1>
            <div style="width: 40px; height: 2px; background: #d4af37; margin: 12px auto 0;"></div>
          </div>

          <p style="font-size: 16px; color: #4a5240; line-height: 1.8; margin-bottom: 16px;">
            We have received your message and will be in touch with you soon.
          </p>
          <p style="font-size: 16px; color: #4a5240; line-height: 1.8; margin-bottom: 32px;">
            In the meantime, know that you are seen, valued, and welcome here.
          </p>

          <div style="border-top: 1px solid #d4af37; padding-top: 24px; text-align: center;">
            <p style="font-size: 13px; color: #6a6a5a; font-style: italic; margin: 0;">
              Discovering Purpose. Restoring Identity. Awakening Love. Transforming Lives.
            </p>
            <p style="font-size: 12px; color: #9a9a8a; margin-top: 8px;">
              The Beloved Love Initiative
            </p>
          </div>
        </div>
      `,
      });
    } catch (autoReplyErr) {
      // Auto-reply failure shouldn't block the main submission
      console.warn('Auto-reply failed (domain may not be verified yet):', autoReplyErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
