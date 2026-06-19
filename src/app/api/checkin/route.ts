import { NextRequest, NextResponse } from 'next/server';
import { getSanityWriteClient } from '@/lib/sanity';

export async function POST(req: NextRequest) {
  // Simple PIN check — staff only
  const staffPin = process.env.CHECKIN_STAFF_PIN;
  if (!staffPin) {
    return NextResponse.json({ error: 'Check-in not configured.' }, { status: 500 });
  }

  let body: { documentId: string; pin: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { documentId, pin } = body;

  if (pin !== staffPin) {
    return NextResponse.json({ error: 'Incorrect PIN.' }, { status: 403 });
  }

  if (!documentId) {
    return NextResponse.json({ error: 'Missing document ID.' }, { status: 400 });
  }

  try {
    await getSanityWriteClient()
      .patch(documentId)
      .set({ status: 'checked_in' })
      .commit();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Check-in patch error:', err);
    return NextResponse.json({ error: 'Failed to update status. Please try again.' }, { status: 500 });
  }
}
