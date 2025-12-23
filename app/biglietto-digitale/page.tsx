"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function BigliettoDigitaleContent() {
  const searchParams = useSearchParams();

  // qui puoi usare searchParams normalmente
  const nome = searchParams.get("nome");

  return (
    <div style={{ padding: 24 }}>
      <h1>Biglietto Digitale</h1>
      {nome && <p>Nome: {nome}</p>}
    </div>
  );
}

export default function BigliettoDigitalePage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Caricamento…</div>}>
      <BigliettoDigitaleContent />
    </Suspense>
  );
}
