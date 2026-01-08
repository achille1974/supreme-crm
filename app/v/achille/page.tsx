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
        {/* HERO */}
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

        <h1 style={h1}>Achille Beltrami</h1>
        <p style={heroClaim}>Tabaccaio come te. Risultati concreti.</p>
        <p style={subtitle}>
          Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
        </p>

        <p style={ctaLead}>
          Se sei un tabaccaio e vuoi capire se questo progetto può funzionare
          anche per te, <b>scrivimi ora</b>. Te lo racconto in modo concreto,
          senza venderti nulla.
        </p>

        {/* AZIONI */}
        <div style={actions}>
          <a href={waLink} style={btnPrimary} target="_blank">
            🟢 Autorizzo contatto
          </a>
          <a href={saveContact} style={btnGhost}>
            💾 Salva contatto
          </a>
          <a href={telLink} style={btnGhost}>
            📞 Chiama
          </a>
        </div>

        {/* TESTO */}
        <section style={text}>
          <p>
            Sono un tabaccaio, non un rappresentante. Questo progetto l’ho
            applicato prima nella mia tabaccheria.
          </p>
          <p>
            Dal 1876 la mia famiglia è qui, nello stesso basso commerciale.
          </p>
          <p>
            Oggi è chiaro che i giovani non entrano più dalle sigarette
            tradizionali, ma dal vaping e dal tabacco riscaldato.
          </p>
          <p>
            Non conviene fare un bazar. Conviene specializzarsi.
          </p>
          <p>
            Ho creduto in un progetto costruito da <b>Suprem-e</b> e oggi ne vedo
            i risultati.
          </p>
        </section>

        <p style={ctaReinforce}>
          💬 Vuoi capire se è adatto anche alla tua tabaccheria? Scrivimi ora.
        </p>

        {/* FOTO */}
        <h2 style={h2}>La storia</h2>
        <div style={grid}>
          {fotoStoriche.map((src) => (
            <div key={src} style={imgContain}>
              <Image src={src} alt="Storia" fill />
            </div>
          ))}
        </div>

        <h2 style={h2}>La tabaccheria oggi</h2>
        <div style={grid}>
          {fotoOggi.map((src) => (
            <div key={src} style={imgCover}>
              <Image src={src} alt="Oggi" fill />
            </div>
          ))}
        </div>

        {/* LINK */}
        <div style={links}>
          <a href="/biglietto/storia-beltrami.pdf" target="_blank" style={btnGhost}>
            📜 Storia della mia famiglia
          </a>
          <a href="https://www.suprem-e.it" target="_blank" style={btnGhost}>
            🏭 Azienda Suprem-e
          </a>
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

const page: CSSProperties = { background: "#FAFAF8", minHeight: "100vh" };
const container: CSSProperties = { maxWidth: 820, margin: "0 auto", padding: 16 };
const hero: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 };
const photoWrap: CSSProperties = { position: "relative", height: 300 };
const videoWrap: CSSProperties = { position: "relative", borderRadius: 18, overflow: "hidden", background: "#000" };
const videoOverlay: CSSProperties = { position: "absolute", top: 12, left: 12, right: 12, color: "#fff", fontWeight: 800 };
const video: CSSProperties = { width: "100%", height: "100%", objectFit: "cover" };
const h1: CSSProperties = { fontSize: 32, fontWeight: 900 };
const heroClaim: CSSProperties = { fontSize: 16, fontWeight: 800 };
const subtitle: CSSProperties = { fontSize: 14, color: "#374151" };
const ctaLead: CSSProperties = { fontSize: 15 };
const actions: CSSProperties = { display: "flex", gap: 12, flexWrap: "wrap" };
const btnPrimary: CSSProperties = { padding: "12px 22px", background: "#16a34a", color: "#fff", borderRadius: 999, fontWeight: 800 };
const btnGhost: CSSProperties = { padding: "12px 22px", border: "1px solid #D1D5DB", borderRadius: 999, fontWeight: 700 };
const text: CSSProperties = { fontSize: 16, lineHeight: 1.65 };
const ctaReinforce: CSSProperties = { marginTop: 22, fontWeight: 900 };
const h2: CSSProperties = { marginTop: 40, fontSize: 24, fontWeight: 900 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const imgContain: CSSProperties = { position: "relative", height: 170 };
const imgCover: CSSProperties = { position: "relative", height: 190 };
const links: CSSProperties = { marginTop: 32, display: "flex", flexDirection: "column", gap: 14 };
const footer: CSSProperties = { marginTop: 40, textAlign: "center", fontSize: 12, color: "#6B7280" };
const stickyCta: CSSProperties = {
  position: "fixed",
  bottom: 14,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#16a34a",
  color: "#fff",
  padding: "14px 26px",
  borderRadius: 999,
  fontWeight: 900,
  zIndex: 999,
};
