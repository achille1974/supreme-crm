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

  // 🎥 VIDEO HARDCODED (biglietto pubblico)
  const VIMEO_ID = "1146389886";

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

        {/* HERO: FOTO + VIDEO */}
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

          <div style={videoHero}>
            <p style={videoTitle}>Te lo racconto qui, senza filtri.</p>
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0`}
              style={{ width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        {/* NOME */}
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
          <a
            href={waLink}
            style={btnPrimary}
            target="_blank"
            rel="noreferrer"
            onClick={() => console.log("CTA WhatsApp")}
          >
            💬 WhatsApp
          </a>
          <a href={saveContact} style={btnGhost}>
            💾 Salva contatto
          </a>
          <a
            href={telLink}
            style={btnGhost}
            onClick={() => console.log("CTA Chiama")}
          >
            📞 Chiama
          </a>
        </div>

        {/* TESTO PERSONALE */}
        <div style={text}>
          <p>Sono un tabaccaio, non un rappresentante.</p>
          <p>
            Dal 1876 la mia famiglia è qui, nello stesso basso commerciale.
          </p>
          <p>
            Oggi è chiaro che i giovani entrano dal vaping e dal tabacco
            riscaldato, non dalle sigarette tradizionali.
          </p>
          <p>
            Non conviene fare un bazar. Conviene specializzarsi e seguire un
            progetto fatto bene.
          </p>
          <p>
            Ho creduto in un progetto costruito da <b>Suprem-e</b> e oggi ne
            vedo i risultati concreti.
          </p>
          <p>
            Se sei un collega e vuoi capire se può funzionare anche per te,
            <b> scrivimi su WhatsApp</b>. Te lo spiego in 5 minuti.
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

        {/* SEZIONE AZIENDA */}
        <h2 style={h2}>Il progetto industriale oggi</h2>
        <div style={text}>
          <p>
            Quartier generale nuovo, produzione stabile, <b>200 spedizioni B2B
            al giorno</b>, turno serale attivo.
          </p>
          <p>
            Mercato: <b>online giù, tabaccherie su</b>. Noi abbiamo guidato.
          </p>
          <ul style={list}>
            <li>Likbar: <b>4° brand pod</b> (Nielsen)</li>
            <li>Suprem-e: <b>#1 liquidi</b> ~30% market share</li>
            <li><b>150 impianti vetrina</b></li>
            <li><b>4.000+ clienti</b></li>
          </ul>
          <p>
            Fatturato 2025: <b>+30%</b> vs mercato +15%.
          </p>
          <p>
            <b>Siamo pronti a un cambio passo straordinario.</b>
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
          <a href="/biglietto/storia-beltrami.pdf" target="_blank" style={btnGhost}>
            📜 Storia della mia famiglia
          </a>
          <a href="https://www.suprem-e.it" target="_blank" style={btnGhost}>
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
const container: CSSProperties = { maxWidth: 720, margin: "0 auto", padding: 16 };

const hero: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginBottom: 16,
};

const photoWrap: CSSProperties = { position: "relative", height: 220 };
const videoHero: CSSProperties = { aspectRatio: "16 / 9" };
const videoTitle: CSSProperties = { fontSize: 14, fontWeight: 700, marginBottom: 6 };

const h1: CSSProperties = { fontSize: 28, fontWeight: 900 };
const heroClaim: CSSProperties = { fontSize: 15, fontWeight: 800, marginBottom: 4 };
const subtitle: CSSProperties = { fontSize: 14, color: "#374151", marginBottom: 8 };
const ctaLead: CSSProperties = { fontSize: 15, marginBottom: 12 };

const actions: CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 };

const btnPrimary: CSSProperties = {
  padding: "12px 16px",
  background: "#111827",
  color: "#fff",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
};

const btnGhost: CSSProperties = {
  padding: "12px 16px",
  border: "1px solid #D1D5DB",
  borderRadius: 14,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 700,
};

const text: CSSProperties = { fontSize: 16, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 10 };
const ctaReinforce: CSSProperties = { marginTop: 20, fontWeight: 800 };

const h2: CSSProperties = { marginTop: 30, fontSize: 22, fontWeight: 900 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };

const imgContain: CSSProperties = { position: "relative", height: 160 };
const imgCover: CSSProperties = { position: "relative", height: 180 };

const links: CSSProperties = { marginTop: 30, display: "flex", flexDirection: "column", gap: 12 };
const logoWrap: CSSProperties = { marginTop: 50, padding: "24px 0", display: "flex", justifyContent: "center" };

const footer: CSSProperties = { marginTop: 40, textAlign: "center", fontSize: 12, color: "#6B7280" };

const list: CSSProperties = { paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 };

const todayDivider: CSSProperties = { marginTop: 28, display: "flex", alignItems: "center", gap: 12 };
const todayLine: CSSProperties = { flex: 1, height: 1, background: "#E5E7EB" };
const todayLabel = { fontSize: 14, fontWeight: 800, color: "#111827", whiteSpace: "nowrap" as const };

const stickyCta: CSSProperties = {
  position: "fixed",
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#16a34a",
  color: "#fff",
  padding: "14px 20px",
  borderRadius: 999,
  fontWeight: 900,
  textDecoration: "none",
  zIndex: 999,
};
