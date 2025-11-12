import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import { cookies } from "next/headers";
import { getKorpa } from "@/lib/actions";
import UspjesnoPlacanjeClient from './UspjesnoPlacanjeClient';

export default async function UspjesnoPlacanjePage() {
  // Server-side: učitaj sesiju
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  // Detekcija payment providera iz query stringa (ili cookies)
  const cookieStore = cookies();
  const url = (await cookieStore).get("next-url")?.value || "";
  let paymentProvider = "unknown";
  if (url.includes("provider=monripay") || url.includes("Success=true")) {
    paymentProvider = "monripay";
  }


  // Učitaj stavke iz korpe iz baze po userId
  let korpaStavke: any[] = [];
  if (userId) {
    const korpaResult = await getKorpa(userId);
    if (korpaResult.success && korpaResult.data) {
      korpaStavke = korpaResult.data.stavke;
    }
  }


  return (
    <UspjesnoPlacanjeClient
      userId={userId}
      paymentProvider={paymentProvider}
      korpaStavke={korpaStavke}
    />
  );
}

