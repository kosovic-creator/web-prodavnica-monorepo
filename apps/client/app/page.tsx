import { prisma } from "@web-prodavnica/db";


export default async function Page() {
  const korisnici = await prisma.korisnik.findMany();
  return (
    <div>
     <>
       {/* <h1>Lista korisnika</h1>
       <ul>
         {korisnici.map((korisnik) => (
           <li key={korisnik.id}>{korisnik.ime} {korisnik.prezime}</li>
         ))}
       </ul> */}
     </>
    </div>
  );
}
