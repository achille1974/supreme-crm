"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

export const dynamic = "force-dynamic";

function clean(raw: string) {
  return (raw || "").replace(/[^\d]/g, "");
}

export default function AchillePage() {
  // 🔒 NUMERI HARDCODED (biglietto pubblico)
  const phone = clean("393473214561");
  const whatsapp = clean("393473214561");

  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Ciao Achille,\n" +
      "ho visto il tuo biglietto digitale e ti autorizzo a contattarmi " +
      "via WhatsApp o telefono solo per questa conversazione."
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
        <div style={hero}>
          <div style={photoWrap}>
            <Image
              src="/biglietto/achille.jpg"
              alt="Achille Beltrami"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* VIDEO SELF-HOSTED */}
          <div style={videoWrap}>
            <video
              src="/video/achille.mp4"
              controls
              playsInline
              preload="metadata"
              style={video}
            />
          </div>
        </div>

        {/* NOME + CLAIM */}
        <h1 style={h1}>Achille Beltrami</h1>
        <p style={heroClaim}>Tabaccaio come te. Risultati concreti.</p>
        <p style={subtitle}>
          Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
        </p>

        {/* CTA GUIDA */}
        <p style={ctaLead}>
          Se sei un tabaccaio e vuoi capire se questo progetto può funzionare
          anche per te, <b>scrivimi ora</b>. Te lo racconto in modo concreto,
          senza venderti nulla.
        </p>

        {/* AZIONI */}
        <div style={actions}>
          <a href={waLink} style={btnPrimary} target="_blank" rel="noreferrer">
            💬 WhatsApp
          </a>
          <a href={saveContact} style={btnGhost}>
            💾 Salva contatto
          </a>
          <a href={telLink} style={btnGhost}>
            📞 Chiama
          </a>
        </div>

        {/* TESTO PERSONALE */}
        <div style={text}>
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
        </div>

        {/* CTA RINFORZO */}
        <p style={ctaReinforce}>
          💬 Vuoi capire se è adatto anche alla tua tabaccheria? Scrivimi ora.
        </p>

        {/* SEPARATORE */}
        <div style={todayDivider}>
          <span style={todayLine} />
          <span style={todayLabel}>Oggi. Scelte concrete.</span>
          <span style={todayLine} />
        </div>

        {/* SEZIONE INDUSTRIALE */}
        <h2 style={h2}>Il progetto industriale oggi</h2>

        <div style={text}>
          <p>
            Abbiamo investito nel nuovo quartier generale, un’infrastruttura
            pensata per sostenere una crescita industriale vera. La produzione è
            stabile, la logistica ha toccato <b>200 spedizioni B2B al giorno</b>,
            il turno serale è realtà e la macchina operativa si muove con una
            precisione che fino a poco tempo fa era difficile immaginare.
          </p>

          <p>
            Il mercato è cambiato: <b>online giù, specializzati e tabaccherie
            su</b>. In questo contesto noi non ci siamo adattati:{" "}
            <b>abbiamo guidato</b>.
          </p>

          <ul style={list}>
            <li>
              Likbar è diventato il <b>4° brand di pod in tabaccheria</b> (dati
              Nielsen)
            </li>
            <li>
              Suprem-e è il <b>1° brand di liquidi in tabaccheria</b> con quasi
              il <b>30% di market share</b> (dati Nielsen)
            </li>
            <li>
              Quasi <b>150 impianti vetrina</b> nelle posizioni più strategiche
              del retail italiano
            </li>
            <li>
              Oltre <b>4.000 nuovi clienti</b> raggiunti
            </li>
          </ul>

          <p>
            E tutto questo mentre il fatturato 2025 cresce del <b>30%</b> in un
            mercato che corre al +15% quest’anno:{" "}
            <b>il doppio della performance del mercato nazionale</b>.
          </p>

          <p>
            Innovazione vera, non annunciata: primo hardware open con Fly,
            Nicotine Pouches in arrivo, la prima linea MAXI Flavour con estratti
            organici, il primo spin-off della One con Biscottone e un R&D che
            continua a dimostrare perché siamo leader nei gusti che fanno
            tendenza e nei volumi di mercato.
          </p>

          <p>
            Commerciale, marketing e comunicazione: presenza costante sulle
            principali riviste, materiali che parlano da soli, <b>11 eventi
            territoriali</b>, una nuova risorsa dedicata al social media
            marketing con una strategia che rimette il brand al centro della
            conversazione nel settore.
          </p>

          <p>
            Il 2026 non ci chiede cautela. Ci chiede <b>ambizione</b>. Accelerare
            su tutti i canali, consolidare la leadership nei liquidi, far
            crescere il brand nelle tabaccherie, restituire valore al canale
            specializzato ed esprimere davvero il potenziale dei nuovi prodotti.
          </p>

          <p>
            <b>
              Siamo una presenza dirompente e siamo pronti e mentalizzati per un
              cambio passo straordinario.
            </b>
          </p>
        </div>

        {/* FOTO STORICHE */}
        <h2 style={h2}>La storia</h2>
        <div style={grid}>
          {fotoStoriche.map((src) => (
            <div key={src} style={imgContain}>
              <Image src={src} alt="Storia" fill style={{ objectFit: "contain" }} />
            </div>
          ))}
        </div>

        {/* FOTO OGGI */}
        <h2 style={h2}>La tabaccheria oggi</h2>
        <div style={grid}>
          {fotoOggi.map((src) => (
            <div key={src} style={imgCover}>
              <Image src={src} alt="Oggi" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>

        {/* LINK */}
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

        {/* LOGO */}
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

      {/* CTA STICKY MOBILE */}
      <a href={waLink} style={stickyCta}>
        💬 Scrivimi su WhatsApp
      </a>
    </div>
  );
}

/* ================= STILI ================= */

const page: CSSProperties = { background: "#FAFAF8", minHeight: "100vh" };
const container: CSSProperties = { maxWidth: 760, margin: "0 auto", padding: 16 };

const hero: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginBottom: 16,
};

const photoWrap: CSSProperties = { position: "relative", height: 260 };

const videoWrap: CSSProperties = {
  position: "relative",
  borderRadius: 16,
  overflow: "hidden",
};

const video: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const h1: CSSProperties = { fontSize: 30, fontWeight: 900, marginTop: 16 };

const heroClaim: CSSProperties = {
  fontSize: 16,
  fontWeight: 800,
  marginTop: 8,
  marginBottom: 10,
  lineHeight: 1.4,
};

const subtitle: CSSProperties = {
  fontSize: 14,
  color: "#374151",
  lineHeight: 1.6,
  marginBottom: 14,
};

const ctaLead: CSSProperties = { fontSize: 15, marginBottom: 12 };

const actions: CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginBottom: 16,
};

const btnPrimary: CSSProperties = {
  padding: "12px 18px",
  background: "#111827",
  color: "#fff",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 800,
};

const btnGhost: CSSProperties = {
  padding: "12px 18px",
  border: "1px solid #D1D5DB",
  borderRadius: 999,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 700,
};

const text: CSSProperties = {
  fontSize: 16,
  lineHeight: 1.6,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const ctaReinforce: CSSProperties = { marginTop: 20, fontWeight: 800 };

const h2: CSSProperties = { marginTop: 36, fontSize: 22, fontWeight: 900 };

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
};

const imgContain: CSSProperties = { position: "relative", height: 160 };
const imgCover: CSSProperties = { position: "relative", height: 180 };

const links: CSSProperties = {
  marginTop: 30,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const logoWrap: CSSProperties = {
  marginTop: 50,
  padding: "24px 0",
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
  gap: 6,
};

const todayDivider: CSSProperties = {
  marginTop: 28,
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
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#16a34a",
  color: "#fff",
  padding: "14px 22px",
  borderRadius: 999,
  fontWeight: 900,
  textDecoration: "none",
  zIndex: 999,
};
