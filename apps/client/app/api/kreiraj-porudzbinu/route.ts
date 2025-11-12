import { NextRequest, NextResponse } from 'next/server';
import { kreirajPorudzbinu } from '@/lib/actions';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('[API] /api/kreiraj-porudzbinu primio:', data);
    const result = await kreirajPorudzbinu(data);
    console.log('[API] /api/kreiraj-porudzbinu rezultat:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] /api/kreiraj-porudzbinu greška:', error);
    return NextResponse.json({ success: false, error: 'Greška na serveru.' }, { status: 500 });
  }
}
