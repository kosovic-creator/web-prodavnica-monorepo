import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@web-prodavnica/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const proizvod = await prisma.proizvod.create({
      data
    });
    return NextResponse.json({ success: true, data: proizvod });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Greška na serveru.' }, { status: 500 });
  }
}
