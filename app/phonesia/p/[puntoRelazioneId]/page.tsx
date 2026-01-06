import { PUNTI_RELAZIONE } from "@/app/lib/data/punti-relazione/puntiRelazione";
import { RESPONSABILI } from "@/app/lib/data/responsabili/responsabili";

type PageProps = {
  params: { puntoRelazioneId: string };
};

export default function PuntoRelazionePage({ params }: PageProps) {
  const punto = PUNTI_RELAZIONE.find(
    (p) => p.id === params.puntoRelazioneId
  );

  if (!punto) {
    return <div style={{ padding: 24 }}>Punto di relazione non valido</div>;
  }

  const responsabile = RESPONSABILI[punto.responsabileId];

  if (!responsabile) {
    return <div style={{ padding: 24 }}>Responsabile non configurato</div>;
  }

  const twilioNumber =
    process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_NUMBER || "";

  const whatsappLink = `https://wa.me/${twilioNumber.replace(/\D/g, "")}`;

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "0 auto",
        padding: 24,
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <img
        src={responsabile.foto}
        alt={`${responsabile.nome} ${responsabile.cognome}`}
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 16,
        }}
      />

      <h1>
        {responsabile.nome} {responsabile.cognome}
      </h1>

      <p style={{ color: "#555" }}>{responsabile.ruolo}</p>

      <p>
        <strong>{punto.nome}</strong>
        <br />
        {punto.indirizzo}
      </p>

      <a
        href={whatsappLink}
        style={{
          display: "block",
          marginTop: 24,
          padding: "14px 18px",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Scrivi su WhatsApp
      </a>

      <p style={{ fontSize: 12, marginTop: 24, color: "#777" }}>
        Proseguendo accetti il trattamento dei dati personali
        esclusivamente per finalità di assistenza e relazione
        con PHONESIA.
      </p>
    </main>
  );
}
