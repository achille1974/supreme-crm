"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const CANALI = ["Telefono", "WhatsApp", "Email", "Visita", "Altro"];
const ESITI = ["", "Interessato", "Richiamare", "Non interessato", "Cliente attivo"];

export default function InterazioneForm({
  tabaccaioId,
  onSaved,
}: {
  tabaccaioId: number;
  onSaved: () => void;
}) {
  const [canale, setCanale] = useState("");
  const [oggetto, setOggetto] = useState("");
  const [esito, setEsito] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  async function salva() {
    setSaving(true);

    await supabase.from("interazioni").insert({
      tabaccaio_id: tabaccaioId,
      canale,
      oggetto,
      esito,
      note,
    });

    setSaving(false);
    setCanale("");
    setOggetto("");
    setEsito("");
    setNote("");
    onSaved();
  }

  return (
    <div className="border rounded p-4 bg-white space-y-3">
      <h3 className="font-semibold">Aggiungi interazione</h3>

      <select
        className="border rounded px-2 py-1 w-full"
        value={canale}
        onChange={(e) => setCanale(e.target.value)}
      >
        <option value="">Canale…</option>
        {CANALI.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input
        className="border rounded px-2 py-1 w-full"
        placeholder="Oggetto"
        value={oggetto}
        onChange={(e) => setOggetto(e.target.value)}
      />

      <select
        className="border rounded px-2 py-1 w-full"
        value={esito}
        onChange={(e) => setEsito(e.target.value)}
      >
        {ESITI.map((e) => (
          <option key={e}>{e}</option>
        ))}
      </select>

      <textarea
        rows={3}
        className="border rounded px-2 py-1 w-full"
        placeholder="Note aggiuntive…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={salva}
        disabled={saving}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        {saving ? "Salvataggio…" : "Salva interazione"}
      </button>
    </div>
  );
}