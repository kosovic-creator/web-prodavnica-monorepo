import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@web-prodavnica/db';

// API za čitanje test podataka (korisnici, proizvodi, porudžbine)
export async function GET(req: NextRequest) {
  try {
    // Učitaj sve korisnike, proizvode, porudžbine
    const korisnici = await prisma.korisnik.findMany();
    const proizvodi = await prisma.proizvod.findMany();
    const porudzbine = await prisma.porudzbina.findMany({ include: { stavkePorudzbine: true } });
    return NextResponse.json({ success: true, korisnici, proizvodi, porudzbine });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Greška na serveru.' }, { status: 500 });
  }
}

// API za brisanje svih test podataka
export async function DELETE(req: NextRequest) {
  try {
    // Prvo obriši zavisne entitete
    await prisma.stavkaPorudzbine.deleteMany();
    await prisma.porudzbina.deleteMany();
    await prisma.stavkaKorpe.deleteMany();
    await prisma.omiljeni.deleteMany();
    await prisma.podaciPreuzimanja.deleteMany();
    // Onda proizvode i korisnike
    await prisma.proizvod.deleteMany();
    await prisma.korisnik.deleteMany();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Greška na serveru.' }, { status: 500 });
  }
}
