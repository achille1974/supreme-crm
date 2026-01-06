"use client";

import { useState } from "react";
import { createScadenza, updateScadenza } from "@/lib/data/scadenze";
import { Scadenza } from "@/lib/types/scadenza";

const TIPI = [
  "assicurazione",
  "telefono_rate",
  "offerta",
  "abbonamento",
  "richiamo",
  "vario",
];

export default function ScadenzaForm({
  clienteId,
  scadenza,
  onClose,
  onSaved,
}: {
  clienteId: number;
  scadenza?: Scadenza;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [tipo, setTipo] = useState(scadenza?.tipo_scadenza || "vario");
  const [data, setData] = useState(
    scadenza?.data_scadenza?.slice(0, 10) || ""
  );
  const [descrizione, setDescrizione] = useState(
    scadenza?.descrizione || ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      if (scadenza) {
        await updateScadenza(scadenza.id, {
          tipo_scadenza: tipo,
          data_scadenza: data,
          descrizione,
        });
      } else {
        await createScadenza({
          cliente_id: clienteId,
          tipo_scadenza: tipo,
          data_scadenza: data,
          descrizione,
        });
      }
      onSaved();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        {TIPI.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <input
        placeholder="Descrizione (libera)"
        value={descrizione}
        onChange={(e) => setDescrizione(e.target.value)}
      />

      <button onClick={handleSave} disabled={saving}>
        Salva
      </button>
      <button onClick={onClose}>Annulla</button>
    </div>
  );
}
