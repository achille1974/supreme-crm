"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  onClose: () => void;
};

export default function NuovoTabaccaioModal({ onClose }: Props) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    ragione_sociale: "",
    comune: "",
    indirizzo: "",
    cellulare: "",
    email: "",
  });

  async function save() {
    if (!form.ragione_sociale || !form.comune) {
      alert("Ragione sociale e Comune sono obbligatori");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("tabaccai")
      .insert({
        ragione_sociale: form.ragione_sociale,
        comune: form.comune,
        indirizzo: form.indirizzo || null,
        cellulare: form.cellulare || null,
        email: form.email || null,
      })
      .select("id")
      .single();

    setSaving(false);

    if (error || !data?.id) {
      console.error(error);
      alert("Errore nella creazione del tabaccaio");
      return;
    }

    onClose();
    router.push(`/tabaccai/${data.id}`);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Nuovo tabaccaio</h2>

        <input
          placeholder="Ragione sociale *"
          className="input"
          value={form.ragione_sociale}
          onChange={(e) =>
            setForm({ ...form, ragione_sociale: e.target.value })
          }
        />

        <input
          placeholder="Comune *"
          className="input"
          value={form.comune}
          onChange={(e) =>
            setForm({ ...form, comune: e.target.value })
          }
        />

        <input
          placeholder="Indirizzo"
          className="input"
          value={form.indirizzo}
          onChange={(e) =>
            setForm({ ...form, indirizzo: e.target.value })
          }
        />

        <input
          placeholder="Cellulare"
          className="input"
          value={form.cellulare}
          onChange={(e) =>
            setForm({ ...form, cellulare: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100"
          >
            Annulla
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
          >
            {saving ? "Salvataggio…" : "Crea"}
          </button>
        </div>
      </div>
    </div>
  );
}
