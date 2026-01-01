import Image from "next/image";

export const dynamic = "force-dynamic";

function clean(raw: string) {
  return (raw || "").replace(/[^\d]/g, "");
}

export default function AchillePage() {
  const phone = clean(process.env.NEXT_PUBLIC_PHONE_NUMBER || "");
  const whatsapp = clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || phone);
  const VIMEO_ID = process.env.NEXT_PUBLIC_VIMEO_ID || "";

  const waLink = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        "Ciao Achille,\n" +
          "ho visto il tuo biglietto digitale e ti autorizzo a contattarmi " +
          "via WhatsApp o telefono solo per questa conversazione."
      )}`
    : "";

  const telLink = phone ? `tel:${phone}` : "";
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
        {/* FOTO */}
        <div style={photoWrap}>
          <Image
            src="/biglietto/achille.jpg"
            alt="Achille Beltrami"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* NOME */}
        <h1 style={h1}>Achille Beltrami</h1>
        <p style={subtitle}>
          Tabaccheria dal 1876 · stessa famiglia · stesso basso commerciale
        </p>

        {/* AZIONI */}
        <div style={actions}>
          {waLink && (
            <a href={waLink} style={btnPrimary} target="_blank" rel="noreferrer">
              💬 WhatsApp
            </a>
          )}
          <a href={saveContact} style={btnGhost}>
            💾 Salva contatto
          </a>
          {telLink && (
            <a href={telLink} style={btnGhost}>
              📞 Chiama
            </a>
          )}
        </div>

        {/* TESTO */}
        <div style={text}>
          <p>
            Sono un tabaccaio, non un rappresentante.
            Questo progetto l’ho applicato prima nella mia tabaccheria.
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
            Non conviene fare un bazar.
            Conviene specializzarsi e seguire un progetto fatto bene.
          </p>

          <p>
            Io non ho inventato nulla.
            Ho creduto in un progetto costruito da <b>Suprem-e</b>,
            l’ho seguito e oggi ne vedo i risultati in termini di redditività.
          </p>

          <p>
            Se sei un collega e vuoi capire se può funzionare anche per te,
            scrivimi. Te lo racconto volentieri.
          </p>
        </div>

        {/* === MICRO SEPARAZIONE (UNICA AGGIUNTA) === */}
        <div style={todayDivider}>
          <span style={todayLine} />
          <span style={todayLabel}>Oggi. Scelte concrete.</span>
          <span style={todayLine} />
        </div>

        {/* VIDEO */}
        {VIMEO_ID && (
          <div style={videoWrap}>
            <iframe
              src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0`}
              style={{ width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        )}

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

        <footer style={footer}>
          © Achille Beltrami · dal 1876
        </footer>
      </main>
    </div>
  );
}

/* STILI */
const page = { background: "#FAFAF8", minHeight: "100vh" };
const container = { maxWidth: 720, margin: "0 auto", padding: 16 };
const photoWrap = { position: "relative", height: 220, marginBottom: 12 };
const h1 = { fontSize: 28, fontWeight: 900 };
const subtitle = { fontSize: 14, color: "#374151", marginBottom: 8 };
const actions = { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 };
const btnPrimary = {
  padding: "12px 16px",
  background: "#111827",
  color: "#fff",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
};
const btnGhost = {
  padding: "12px 16px",
  border: "1px solid #D1D5DB",
  borderRadius: 14,
  textDecoration: "none",
  color: "#111827",
  fontWeight: 700,
};
const text = {
  fontSize: 16,
  lineHeight: 1.6,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};
const videoWrap = { marginTop: 24, aspectRatio: "16/9" };
const h2 = { marginTop: 30, fontSize: 22, fontWeight: 900 };
const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };
const imgContain = { position: "relative", height: 160 };
const imgCover = { position: "relative", height: 180 };
const links = { marginTop: 30, display: "flex", flexDirection: "column", gap: 12 };
const logoWrap = {
  marginTop: 50,
  padding: "24px 0",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};
const footer = { marginTop: 40, textAlign: "center", fontSize: 12, color: "#6B7280" };

/* MICRO SEPARAZIONE */
const todayDivider = {
  marginTop: 28,
  display: "flex",
  alignItems: "center",
  gap: 12,
};
const todayLine = {
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
