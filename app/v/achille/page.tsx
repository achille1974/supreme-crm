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

        <h1 style={h1}>Achille Beltrami</h1>

        <p style={heroClaim}>
          Tabaccaio come te. Risultati concreti.
        </p>

        <p style={subtitle}>
          Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
        </p>

        <p style={ctaLead}>
          Se sei un tabaccaio e vuoi capire se questo progetto può funzionare
          anche per te, <b>scrivimi ora</b>. Te lo racconto in modo concreto,
          senza venderti nulla.
        </p>

        {/* ================= AZIONI ================= */}
        <div style={actions}>
          <a href={waLink} style={btnPrimary} target="_blank" rel="noreferrer">
            🟢 Clicca per autorizzarmi a contattarti telefonicamente o su WhatsApp
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

        <section style={text}>
          <p>
            Abbiamo investito nel nuovo quartier generale, un’infrastruttura
            pensata per sostenere una crescita industriale vera.
          </p>
        </section>

        {/* ================= FOTO ================= */}
        <h2 style={h2}>La storia</h2>
        <div style={grid}>
          {fotoStoriche.map((src) => (
            <div key={src} style={imgContain}>
              <Image src={src} alt="Storia" fill style={{ objectFit: "contain" }} />
            </div>
          ))}
        </div>

        <h2 style={h2}>La tabaccheria oggi</h2>
        <div style={grid}>
          {fotoOggi.map((src) => (
            <div key={src} style={imgCover}>
              <Image src={src} alt="Oggi" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>

        <div style={links}>
          <a href="/biglietto/storia-beltrami.pdf" target="_blank" style={btnGhost}>
            📜 Storia della mia famiglia
          </a>
          <a href="https://www.suprem-e.it" target="_blank" style={btnGhost}>
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

const page: CSSProperties = { background: "#FAFAF8", minHeight: "100vh" };

const container: CSSProperties = {
  maxWidth: 820,
  margin: "0 auto",
  padding: 16,
};

const hero: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1.2fr",
  gap: 20,
  marginBottom: 24,
};

const photoWrap: CSSProperties = {
  position: "relative",
  height: 300,
};

const videoWrap: CSSProperties = {
  position: "relative",
  borderRadius: 18,
  overflow: "hidden",
  background: "#000",
};

const videoOverlay: CSSProperties = {
  position: "absolute",
  top: 12,
  left: 12,
  right: 12,
  zIndex: 2,
  color: "#fff",
  fontWeight: 800,
  fontSize: 14,
  textAlign: "center",
  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
};

const video: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const h1: CSSProperties = {
  fontSize: 32,
  fontWeight: 900,
  marginTop: 10,
};

const heroClaim: CSSProperties = {
  fontSize: 16,
  fontWeight: 800,
  marginTop: 6,
};

const subtitle: CSSProperties = {
  fontSize: 14,
  color: "#374151",
  marginTop: 6,
  marginBottom: 14,
};

const ctaLead: CSSProperties = {
  fontSize: 15,
  marginBottom: 16,
};

const actions: CSSProperties = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 18,
};

const btnPrimary: CSSProperties = {
  padding: "12px 22px",
  background: "#111827",
  color: "#fff",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 800,
};

const btnGhost: CSSProperties = {
  padding: "12px 22px",
  border: "1px solid #D1D5DB",
  borderRadius: 999,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 700,
};

const text: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.65,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const ctaReinforce: CSSProperties = {
  marginTop: 22,
  fontWeight: 900,
};

const h2: CSSProperties = {
  marginTop: 40,
  fontSize: 24,
  fontWeight: 900,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const imgContain: CSSProperties = {
  position: "relative",
  height: 170,
};

const imgCover: CSSProperties = {
  position: "relative",
  height: 190,
};

const links: CSSProperties = {
  marginTop: 32,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const logoWrap: CSSProperties = {
  marginTop: 50,
  padding: "26px 0",
  display: "flex",
  justifyContent: "center",
};

const footer: CSSProperties = {
  marginTop: 40,
  textAlign: "center",
  fontSize: 12,
  color: "#6B7280",
};

const list: CSSProperties = {
  paddingLeft: 18,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const todayDivider: CSSProperties = {
  marginTop: 30,
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const todayLine: CSSProperties = {
  flex: 1,
  height: 1,
  background: "#E5E7EB",
};

const todayLabel = {
  fontSize: 14,
  fontWeight: 800,
  color: "#111827",
  whiteSpace: "nowrap" as const,
};

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
  textDecoration: "none",
  zIndex: 999,
};
