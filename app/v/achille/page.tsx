"use client";

import Link from "next/link";

export default function BigliettoAchillePage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-10 text-slate-900">

      {/* ===== CONTENUTO PRINCIPALE ===== */}
      <h1 className="text-3xl font-extrabold mb-2">
        Achille Beltrami
      </h1>

      <p className="font-semibold mb-4">
        Tabaccaio come te. Risultati concreti.
      </p>

      <p className="text-sm text-slate-600 mb-6">
        Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
      </p>

      <p className="mb-4">
        Se sei un tabaccaio e vuoi capire se questo progetto può funzionare
        anche per te, <strong>scrivimi ora</strong>.  
        Te lo racconto in modo concreto, senza venderti nulla.
      </p>

      {/* ===== PULSANTE FISSO (SEMPLICE) ===== */}
      <div className="flex flex-wrap gap-3 my-6">
        <a
          href="https://wa.me/393000000000"
          className="inline-flex items-center justify-center rounded-full
                     bg-green-600 px-5 py-3 text-white font-semibold
                     hover:bg-green-700 transition"
        >
          Autorizzo contatto
        </a>

        <a
          href="tel:+393000000000"
          className="inline-flex items-center justify-center rounded-full
                     border border-slate-300 px-5 py-3 font-semibold
                     hover:bg-slate-100 transition"
        >
          Chiama
        </a>

        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full
                     border border-slate-300 px-5 py-3 font-semibold
                     hover:bg-slate-100 transition"
        >
          Salva contatto
        </a>
      </div>

      <p className="mb-4">
        Sono un tabaccaio, non un rappresentante.  
        Questo progetto l’ho applicato prima nella mia tabaccheria.
      </p>

      <p className="mb-4">
        Dal 1876 la mia famiglia è qui, nello stesso basso commerciale.
        Ho visto il mercato cambiare più volte.
      </p>

      <p className="mb-4">
        Oggi è chiaro che i giovani non entrano più dalle sigarette tradizionali,
        ma dal vaping e dal tabacco riscaldato.
      </p>

      <p className="mb-4">
        Non conviene fare un bazar.  
        Conviene specializzarsi e seguire un progetto fatto bene.
      </p>

      <p className="mb-6">
        Io non ho inventato nulla.  
        Ho creduto in un progetto costruito da <strong>Suprem-e</strong>,
        l’ho seguito e oggi ne vedo i risultati.
      </p>

      <p className="font-semibold">
        Vuoi capire se è adatto anche alla tua tabaccheria? Scrivimi ora.
      </p>

      {/* ===== PULSANTE FLOTTANTE (PRINCIPALE) ===== */}
      <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
        <a
          href="https://wa.me/393000000000"
          className="mx-auto flex max-w-xl items-center justify-center
                     rounded-full bg-green-600 px-6 py-4
                     text-white font-bold shadow-lg
                     hover:bg-green-700 transition"
        >
          🟢 Clicca per autorizzarmi a contattarti telefonicamente o su WhatsApp
        </a>
      </div>
    </div>
  );
}
