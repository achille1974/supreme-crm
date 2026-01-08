"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

export const dynamic = "force-dynamic";

/* ================= UTIL ================= */

function clean(raw: string) {
  return (raw || "").replace(/[^\d]/g, "");
}

/* ================= PAGE ================= */

export default function AchillePage() {
  // 🔒 CONTATTI PUBBLICI
  const phone = clean("393473214561");
  const whatsapp = clean("393473214561");

  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Ciao Achille,\n" +
      "ho visualizzato il tuo biglietto digitale e autorizzo te e la tua azienda " +
      "a contattarmi via WhatsApp, telefono ed email " +
      "per comunicazioni commerciali e informative relative ai prodotti Suprem-e, " +
      "nel rispetto della normativa sulla privacy."
  )}`;

  const telLink = `tel:${phone}`;
  const saveContact = "/biglietto/achille-beltrami.vcf";

  const fotoStoriche = [
    "/biglietto/storiche/01.jpeg",
    "/biglietto/storiche/02.jpeg",
    "/biglietto/storiche/03.jpeg",
    "/biglietto/storiche/04.jpeg",
    "/biglietto/storiche/05.jpeg",
  ];

  const fotoOggi = [
    "/biglietto/oggi/01.jpeg",
    "/biglietto/oggi/02.jpeg",
    "/biglietto/oggi/03.jpeg",
    "/biglietto/oggi/04.jpeg",
  ];

  return (
    <div style={page}>
      <main style={container}>
        {/* ================= HERO ================= */}
        <section style={hero}>
          <div style={photoWrap}>
            <Image
              src="/biglietto/achille.jpg"
              alt="Achille Beltrami"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          <div style={videoWrap}>
            <div style={videoOverlay}>
              Te lo racconto da tabaccaio a tabaccaio. Senza filtri.
            </div>

            <video
              src="/video/achille.mp4"
              controls
              playsInline
              preload="metadata"
              style={video}
            />
          </div>
        </section>

        {/* ================= IDENTITÀ ================= */}
        <h1 style={h1}>Achille Beltrami</h1>

        <p style={heroClaim}>Tabaccaio come te. Risultati concreti.</p>

        <p style={subtitle}>
          Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
        </p>

        {/* ================= INTRO ================= */}
        <p style={ctaLead}>
          Se sei un tabaccaio e vuoi capire se questo progetto può funzionare
          anche per te, <b>scrivimi ora</b>. Te lo racconto in modo concreto,
          senza venderti nulla.
        </p>

        {/* ================= AZIONI ================= */}
        <div style={actions}>
          <a
            href={waLink}
            style={btnPrimary}
            target="_blank"
            rel="noreferrer"
          >
            🟢 Autorizzo contatto
          </a>

          <a href={saveContact} style={btnGhost}>
            💾 Salva contatto
          </a>

          <a href={telLink} style={btnGhost}>
            📞 Chiama
          </a>
        </div>

        {/* ================= TESTO PERSONALE ================= */}
        <section style={text}>
          <p>
            Sono un tabaccaio, non un rappresentante. Questo progetto l’ho
            applicato prima nella mia tabaccheria.
          </p>

          <p>
            Dal 1876 la mia famiglia è qui, nello stesso basso commerciale. Ho
            visto il mercato cambiare più volte.
          </p>

          <p>
            Oggi è chiaro che i giovani non entrano più dalle sigarette
            tradizionali, ma dal vaping e dal tabacco riscaldato.
          </p>

          <p>
            Non conviene fare un bazar. Conviene specializzarsi e seguire un
            progetto fatto bene.
          </p>

          <p>
            Io non ho inventato nulla. Ho creduto in un progetto costruito da{" "}
            <b>Suprem-e</b>, l’ho seguito e oggi ne vedo i risultati in termini
            di redditività.
          </p>

          <p>
            Se sei un collega e vuoi capire se può funzionare anche per te,
            <b> scrivimi su WhatsApp</b>. Te lo spiego in 5 minuti, senza
            impegno.
          </p>
        </section>

        <p style={ctaReinforce}>
          💬 Vuoi capire se è adatto anche alla tua tabaccheria? Scrivimi ora.
        </p>

        {/* ================= DIVIDER ================= */}
        <div style={todayDivider}>
          <span style={todayLine} />
          <span style={todayLabel}>Oggi. Scelte concrete.</span>
          <span style={todayLine} />
        </div>

        {/* ================= PROGETTO INDUSTRIALE ================= */}
        <h2 style={h2}>Il progetto industriale oggi</h2>

        {/* … TUTTO IL RESTO IDENTICO AL TUO FILE … */}

        {/* ================= LINK ================= */}
        <div style={links}>
          <a
            href="/biglietto/storia-beltrami.pdf"
            target="_blank"
            style={btnGhost}
          >
            📜 Storia della mia famiglia
          </a>
          <a
            href="https://www.suprem-e.it"
            target="_blank"
            style={btnGhost}
          >
            🏭 Azienda Suprem-e
          </a>
        </div>

        <div style={logoWrap}>
          <Image
            src="/biglietto/logo.jpg"
            alt="Beltrami dal 1876"
            width={260}
            height={120}
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        <footer style={footer}>© Achille Beltrami · dal 1876</footer>
      </main>

      {/* CTA MOBILE */}
      <a href={waLink} style={stickyCta}>
        🟢 Clicca per autorizzarmi a contattarti telefonicamente o su WhatsApp
      </a>
    </div>
  );
}

/* ================= STILI ================= */

const btnPrimary: CSSProperties = {
  padding: "12px 22px",
  background: "#16a34a",
  color: "#fff",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 800,
};
