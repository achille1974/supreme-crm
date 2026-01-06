"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Tab = "overview" | "oggi" | "azioni";

type OverviewItem = {
  label: string;
  value: number;
};

type ClienteOggi = {
  id: number;
  nome: string;
  cognome: string;
  telefono: string;
};

type Azione = {
  id: number;
  titolo: string;
  canale: string;
  pubblico: string;
  stato: string;
  created_at: string;
};

type Simulazione = {
  totali: number;
  canali: {
    whatsapp: number;
    email: number;
  };
  messaggio: string;
};

export default function DashboardClient({
  overview,
  oggi,
  azioni,
}: {
  overview: OverviewItem[];
  oggi: ClienteOggi[];
  azioni: Azione[];
}) {
  const params = useSearchParams();
  const rawTab = params.get("tab");
  const tab: Tab =
    rawTab === "oggi" || rawTab === "azioni" ? rawTab : "overview";

  const [simulazione, setSimulazione] = useState<Simulazione | null>(null);
  const [simulazioneFor, setSimulazioneFor] = useState<number | null>(null);

  async function attivaAzione(id: number) {
    if (!confirm("Attivare questa azione?")) return;

    const res = await fetch("/phonesia/azioni/attiva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ azione_id: id }),
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Errore durante l’attivazione");
    }
  }

  async function simulaAzione(id: number) {
    const res = await fetch("/phonesia/azioni/simulazione", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ azione_id: id }),
    });

    if (!res.ok) {
      alert("Errore simulazione");
      return;
    }

    const json = await res.json();
    setSimulazione(json);
    setSimulazioneFor(id);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard PHONESIA</h1>
      <p>Centro decisionale operativo</p>

      {/* TAB */}
      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        <TabButton label="Overview" tab="overview" active={tab === "overview"} />
        <TabButton label="Oggi" tab="oggi" active={tab === "oggi"} />
        <TabButton label="Azioni" tab="azioni" active={tab === "azioni"} />
      </div>

      <div style={{ marginTop: 24 }}>
        {/* OVERVIEW */}
        {tab === "overview" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {overview.map(o => (
              <Card key={o.label} label={o.label} value={o.value} />
            ))}
          </div>
        )}

        {/* OGGI */}
        {tab === "oggi" && (
          <div>
            {oggi.length === 0 && (
              <p>Nessun cliente prioritario oggi 🎉</p>
            )}
            {oggi.map(c => (
              <div
                key={c.id}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              >
                <strong>
                  {c.nome} {c.cognome}
                </strong>
                <div style={{ fontSize: 13 }}>{c.telefono}</div>
              </div>
            ))}
          </div>
        )}

        {/* AZIONI */}
        {tab === "azioni" && (
          <div>
            {azioni.length === 0 && <p>Nessuna azione creata.</p>}

            {azioni.map(a => (
              <div
                key={a.id}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{a.titolo}</strong>
                    <div style={{ fontSize: 13, color: "#666" }}>
                      {a.canale} · {a.pubblico}
                    </div>
                    <div style={{ fontSize: 12, color: "#999" }}>
                      {new Date(a.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <span
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        fontSize: 12,
                        background:
                          a.stato === "bozza"
                            ? "#ffeeba"
                            : a.stato === "attiva"
                            ? "#d4edda"
                            : "#e2e3e5",
                      }}
                    >
                      {a.stato.toUpperCase()}
                    </span>

                    <button
                      onClick={() => simulaAzione(a.id)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        background: "#f5f5f5",
                        cursor: "pointer",
                      }}
                    >
                      SIMULA
                    </button>

                    <button
                      disabled={a.stato !== "bozza"}
                      onClick={() => attivaAzione(a.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "none",
                        cursor:
                          a.stato === "bozza" ? "pointer" : "not-allowed",
                        background: "#111",
                        color: "#fff",
                        opacity: a.stato === "bozza" ? 1 : 0.4,
                      }}
                    >
                      ATTIVA
                    </button>
                  </div>
                </div>

                {/* SIMULAZIONE */}
                {simulazioneFor === a.id && simulazione && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 16,
                      background: "#f7f7f7",
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  >
                    <strong>Simulazione invio</strong>
                    <p>Clienti totali: {simulazione.totali}</p>
                    <p>WhatsApp: {simulazione.canali.whatsapp}</p>
                    <p>Email: {simulazione.canali.email}</p>
                    <p style={{ marginTop: 8 }}>
                      <strong>Messaggio:</strong>
                    </p>
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        background: "#fff",
                        padding: 12,
                        borderRadius: 6,
                      }}
                    >
                      {simulazione.messaggio}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* UI */

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 13, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function TabButton({
  label,
  tab,
  active,
}: {
  label: string;
  tab: string;
  active: boolean;
}) {
  return (
    <a
      href={`/phonesia/dashboard?tab=${tab}`}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        textDecoration: "none",
        background: active ? "#111" : "#eee",
        color: active ? "#fff" : "#000",
        fontSize: 14,
      }}
    >
      {label}
    </a>
  );
}
