"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useKorpa } from "@/components/KorpaContext";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UspjesnoPlacanjeClientProps {
  userId: string | null;
  paymentProvider: string;
  korpaStavke: any[];
}

const UspjesnoPlacanjeClient: React.FC<UspjesnoPlacanjeClientProps> = ({
  userId,
  paymentProvider,
  korpaStavke,
}) => {
  const { resetKorpa } = useKorpa();
  const [isLoading, setIsLoading] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [orderCreated, setOrderCreated] = useState(false);

  // Automatski kreiraj porudžbinu nakon uspješnog plaćanja
  useEffect(() => {
    const kreirajPorudzbinu = async () => {
      if (!userId || !korpaStavke || korpaStavke.length === 0 || orderCreated) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        // Pripremi podatke za porudžbinu
        const ukupno = korpaStavke.reduce((acc, s) => acc + (s.proizvod ? s.proizvod.cena * s.kolicina : 0), 0);
        const porudzbinaData = {
          korisnikId: userId,
          ukupno,
          status: "placeno",
          stavke: korpaStavke.map((s: any) => ({
            proizvodId: s.proizvod?.id || "",
            kolicina: s.kolicina,
            cena: s.proizvod?.cena || 0,
            opis: s.proizvod?.opis_sr || s.proizvod?.opis_en || "",
            slike: s.proizvod?.slike || [],
            slika: Array.isArray(s.proizvod?.slike) ? s.proizvod.slike[0] : undefined
          })),
        };
        const response = await fetch("/api/kreiraj-porudzbinu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(porudzbinaData),
        });
        const result = await response.json();
        if (!result.success) {
          setEmailError(result.error || "Greška pri kreiranju porudžbine");
        } else {
          setOrderCreated(true);
          resetKorpa();
        }
      } catch (e) {
        setEmailError("Greška pri kreiranju porudžbine");
      } finally {
        setIsLoading(false);
      }
    };
    kreirajPorudzbinu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, korpaStavke, orderCreated, resetKorpa]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Obrađujem plaćanje...</p>
            {isPending && (
              <p className="text-sm text-blue-600 mt-2">Ažuriram stanje proizvoda...</p>
            )}
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">Plaćanje uspješno!</h1>
              <p className="text-gray-600 mb-4">Vaša porudžbina je obrađena. Hvala na kupovini!</p>
            </div>

            {paymentProvider === "monripay" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-600 font-medium">MonriPay transakcija je uspješno završena.</p>
              </div>
            )}

            {paymentProvider === "unknown" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-yellow-600">Transakcija je završena, ali nije prepoznat provider.</p>
              </div>
            )}

            {emailError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-600">{emailError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Na početnu stranicu
              </button>
              <button
                onClick={() => router.push("/moje-porudzbine")}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-medium"
              >
                Moje porudžbine
              </button>
            </div>

            {/* TEST PODACI: Očitavanje i brisanje */}
            <div className="mt-8">
              <TestPodaciPanel />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Panel za očitavanje i brisanje test podataka
function TestPodaciPanel() {
  const [testPodaci, setTestPodaci] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestPodaci = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/test-podaci");
      const data = await res.json();
      setTestPodaci(data);
    } catch (e) {
      setError("Greška pri učitavanju test podataka.");
    } finally {
      setLoading(false);
    }
  };

  const obrisiTestPodatke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/test-podaci", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTestPodaci(null);
        toast.success("Test podaci obrisani.");
      } else {
        setError("Greška pri brisanju test podataka.");
      }
    } catch (e) {
      setError("Greška pri brisanju test podataka.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex gap-4 mb-2">
        <button
          onClick={fetchTestPodaci}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          Očitaj test podatke
        </button>
        <button
          onClick={obrisiTestPodatke}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          Obriši test podatke
        </button>
      </div>
      {loading && <div className="text-sm text-gray-500">Obrada...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {testPodaci && (
        <pre className="mt-2 text-xs bg-white p-2 rounded overflow-x-auto max-h-64">
          {JSON.stringify(testPodaci, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default UspjesnoPlacanjeClient;
