"use client";

import { useState } from "react";

type Props = {
  clienteId: number;
};

export default function ScadenzaForm({ clienteId }: Props) {
  const [titolo, setTitolo] = useState("");
  const [data, setData] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch("/phonesia/api/scadenze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente_id: clienteId,
          titolo,
          data_scadenza: data,
        }),
      });

      // reset form
      setTitolo("");
      setData("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Titolo"
          value={titolo}
          onChange={(e) => setTitolo(e.target.value)}
          required
        />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <button type="submit" disabled={saving}>
          {saving ? "Salvataggio…" : "Aggiungi"}
        </button>
      </div>
    </form>
  );
}
