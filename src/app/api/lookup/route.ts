import { NextRequest, NextResponse } from 'next/server';
import { getSanityWriteClient } from '@/lib/sanity';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code')?.trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ error: 'No code provided.' }, { status: 400 });
  }

  try {
    const registration = await getSanityWriteClient().fetch(
      `*[_type == "eventRegistration" && accessCode == $code][0]{
        _id,
        fullName,
        email,
        phone,
        gender,
        ageRange,
        address,
        occupation,
        church,
        churchPosition,
        photoConsent,
        whatsappCommunity,
        accessCode,
        status,
        registeredAt
      }`,
      { code }
    );

    if (!registration) {
      return NextResponse.json({ error: 'No registration found for this code.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, registration });
  } catch (err) {
    console.error('Lookup error:', err);
    return NextResponse.json({ error: 'Lookup failed. Please try again.' }, { status: 500 });
  }
}
