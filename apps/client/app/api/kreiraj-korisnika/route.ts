import { NextRequest, NextResponse } from 'next/server';
import { createKorisnik } from '@/lib/actions';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await createKorisnik(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Greška na serveru.' }, { status: 500 });
  }
}
