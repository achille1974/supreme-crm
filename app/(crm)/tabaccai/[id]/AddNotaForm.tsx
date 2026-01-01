"use client";

import { useState } from "react";

export default function AddNotaForm({
  tabaccaioId,
}: {
  tabaccaioId: number;
}) {
  const [testo, setTesto] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function salvaNota() {
    setLoading(true);
    setError(null);
    setOk(false);

    const res = await fetch("/api/crm-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tabaccaio_id: tabaccaioId,
        testo,
      }),
    });

    if (!res.ok) {
      setError("Errore nel salvataggio");
    } else {
      setTesto("");
      setOk(true);
    }

    setLoading(false);
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Aggiungi nota CRM</h3>

      <textarea
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 8 }}
        placeholder="Scrivi una nota..."
      />

      <button
        onClick={salvaNota}
        disabled={loading || !testo.trim()}
        style={{ marginTop: 8 }}
      >
        {loading ? "Salvataggio..." : "Salva nota"}
      </button>

      {ok && <p style={{ color: "green" }}>Nota salvata</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}