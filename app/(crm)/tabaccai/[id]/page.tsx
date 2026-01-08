"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// COMPONENTI
import TabaccaioHeader from "@/components/crm/tabaccai/TabaccaioHeader";
import TabaccaioContatti from "@/components/crm/tabaccai/TabaccaioContatti";
import TabaccaioStato from "@/components/crm/tabaccai/Stato";
import TabaccaioNote from "@/components/crm/tabaccai/Note";
import TabaccaioActions from "@/components/crm/tabaccai/TabaccaioActions";
import Classificazione from "@/components/crm/tabaccai/Classificazione";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TabaccaioPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  /* =========================
     LOAD
  ========================= */
  useEffect(() => {
    if (!id) {
      router.replace("/tabaccai");
      return;
    }

    async function load() {
      const { data, error } = await supabase
        .from("tabaccai_master")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("LOAD ERROR:", error);
        router.replace("/tabaccai");
        return;
      }

      setForm({
        ...data,
        stato_consenso: data.stato_consenso ?? "mai_chiesto",
      });

      setLoading(false);
    }

    load();
  }, [id, router]);

  /* =========================
     SAVE
  ========================= */
  async function save() {
    if (!id) return;
    setSaving(true);

    const payload = {
      // ANAGRAFICA
      ragione_sociale: form.ragione_sociale || null,
      comune: form.comune || null,
      indirizzo: form.indirizzo || null,
      titolare: form.titolare || null,

      // CONTATTI
      telefono: form.telefono || null,
      cellulare: form.cellulare || null,
      email: form.email || null,
      pec: form.pec || null,

      // CONSENSO (UNICO)
      stato_consenso: form.stato_consenso ?? "mai_chiesto",

      // STATO COMMERCIALE
      stato_supreme: form.stato_supreme || null,
      interesse_supreme: form.interesse_supreme || null,
      priorita: form.priorita ?? "media",
      prossima_azione: form.prossima_azione || null,
      data_prossima_azione: form.data_prossima_azione || null,
      nota_prossima_azione: form.nota_prossima_azione || null,

      // PROFILAZIONE
      tipo_attivita: form.tipo_attivita || null,
      dimensione_attivita: form.dimensione_attivita || null,
      zona_attivita: form.zona_attivita || null,
      afflusso_attivita: form.afflusso_attivita || null,
      potenziale_commerciale: form.potenziale_commerciale || null,
      categoria_cliente: form.categoria_cliente || null,
      marchi_trattati: form.marchi_trattati || null,

      // NOTE
      note: form.note || null,
    };

    const { error } = await supabase
      .from("tabaccai_master")
      .update(payload)
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.error("SAVE ERROR:", error);
      alert("Errore nel salvataggio");
      return;
    }

    alert("Salvataggio riuscito");
  }

  /* =========================
     ARCHIVE
  ========================= */
  async function archive() {
    if (!id) return;

    const ok = confirm(
      "Vuoi archiviare questo tabaccaio?\n\nVerrà nascosto dalla lista ma non cancellato."
    );
    if (!ok) return;

    const { error } = await supabase
      .from("tabaccai_master")
      .update({ stato_record: "archiviato" })
      .eq("id", id);

    if (error) {
      alert("Errore durante l’archiviazione");
      return;
    }

    alert("Tabaccaio archiviato");
    router.push("/tabaccai");
  }

  if (loading) return <div className="p-6">Caricamento…</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <TabaccaioHeader
        id={form.id}
        ragione_sociale={form.ragione_sociale}
        titolare={form.titolare}
        comune={form.comune}
        indirizzo={form.indirizzo}
        onChange={(v) => setForm({ ...form, ...v })}
      />

      {/* STATUS BAR */}
      <div className="flex flex-wrap gap-3 items-center text-sm">
        {form.stato_consenso === "autorizzato" && (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
            🟢 Privacy autorizzata
          </span>
        )}
        {form.stato_consenso === "negato" && (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">
            🔴 Privacy negata
          </span>
        )}
        {form.stato_consenso === "mai_chiesto" && (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
            🟡 Privacy non chiesta
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8 lg:col-span-2">
          <TabaccaioContatti
            telefono={form.telefono}
            cellulare={form.cellulare}
            email={form.email}
            pec={form.pec}
            onChange={(v) => setForm({ ...form, ...v })}
          />

          <TabaccaioStato
            stato_supreme={form.stato_supreme}
            interesse_supreme={form.interesse_supreme}
            priorita={form.priorita}
            prossima_azione={form.prossima_azione}
            data_prossima_azione={form.data_prossima_azione}
            nota_prossima_azione={form.nota_prossima_azione}
            onChange={(v) => setForm({ ...form, ...v })}
          />

          <TabaccaioNote
            note={form.note}
            onChange={(v) => setForm({ ...form, note: v })}
          />
        </div>

        <div className="space-y-8">
          <Classificazione
            tipo_attivita={form.tipo_attivita}
            dimensione_attivita={form.dimensione_attivita}
            zona_attivita={form.zona_attivita}
            afflusso_attivita={form.afflusso_attivita}
            potenziale_commerciale={form.potenziale_commerciale}
            categoria_cliente={form.categoria_cliente}
            marchi_trattati={form.marchi_trattati}
            onChange={(v) => setForm({ ...form, ...v })}
          />
        </div>
      </div>

      <TabaccaioActions
        onSave={save}
        onArchive={archive}
        saving={saving}
        onBack={() => router.push("/tabaccai")}
        cellulare={form.cellulare || form.telefono}
      />
    </div>
  );
}
