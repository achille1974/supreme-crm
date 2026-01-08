"use client";

import Link from "next/link";

export default function BigliettoAchille() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* CONTENUTO */}
      <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Achille Beltrami
          </h1>
          <p className="text-lg font-semibold">
            Tabaccaio come te. Risultati concreti.
          </p>
          <p className="text-sm text-slate-600">
            Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
          </p>
        </header>

        {/* INTRO */}
        <section className="space-y-4">
          <p>
            Se sei un tabaccaio e vuoi capire se questo progetto può funzionare
            anche per te, <strong>scrivimi ora</strong>.  
            Te lo racconto in modo concreto, senza venderti nulla.
          </p>

          {/* CTA IN PAGINA */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/393xxxxxxxxx"
              target="_blank"
              className="rounded-full bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition"
            >
              Autorizzo contatto
            </a>

            <a
              href="tel:+393xxxxxxxxx"
              className="rounded-full border px-5 py-3 font-semibold hover:bg-slate-50 transition"
            >
              Chiama
            </a>

            <a
              href="/v/achille.vcf"
              className="rounded-full border px-5 py-3 font-semibold hover:bg-slate-50 transition"
            >
              Salva contatto
            </a>
          </div>
        </section>

        {/* STORY */}
        <section className="space-y-4 text-slate-800">
          <p>
            Sono un tabaccaio, non un rappresentante. Questo progetto l’ho
            applicato prima nella mia tabaccheria.
          </p>

          <p>
            Dal 1876 la mia famiglia è qui, nello stesso basso commerciale.
            Ho visto il mercato cambiare più volte.
          </p>

          <p>
            Oggi è chiaro che i giovani non entrano più dalle sigarette
            tradizionali, ma dal vaping e dal tabacco riscaldato.
          </p>

          <p>
            Non conviene fare un bazar. Conviene specializzarsi e seguire
            un progetto fatto bene.
          </p>

          <p>
            Io non ho inventato nulla. Ho creduto in un progetto costruito
            da <strong>Suprem-e</strong>, l’ho seguito e oggi ne vedo
            i risultati in termini di redditività.
          </p>
        </section>

        {/* VIDEO */}
        <section className="space-y-4">
          <div className="aspect-video overflow-hidden rounded-xl border">
            <iframe
              src="https://player.vimeo.com/video/1146389886"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* LINK DI CREDIBILITÀ */}
        <section className="flex flex-wrap gap-4">
          <a
            href="/biglietto/storia-beltrami.pdf"
            target="_blank"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50 transition"
          >
            📜 Storia della mia famiglia
          </a>

          <a
            href="https://www.suprem-e.it"
            target="_blank"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50 transition"
          >
            🏭 Azienda Suprem-e
          </a>
        </section>

        {/* CTA TESTUALE FINALE */}
        <section className="pt-4">
          <p className="font-semibold">
            Vuoi capire se è adatto anche alla tua tabaccheria? Scrivimi ora.
          </p>
        </section>

      </main>

      {/* CTA FLOTTANTE */}
      <a
        href="https://wa.me/393xxxxxxxxx"
        target="_blank"
        className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 rounded-full bg-green-600 px-6 py-4 text-center text-white font-bold shadow-lg hover:bg-green-700 transition"
      >
        🟢 Clicca per autorizzarmi a contattarti telefonicamente o su WhatsApp
      </a>
    </div>
  );
}
