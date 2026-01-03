"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// COMPONENTI
import TabaccaioHeader from "@/components/crm/tabaccai/TabaccaioHeader";
import TabaccaioContatti from "@/components/crm/tabaccai/TabaccaioContatti";
import TabaccaioPrivacy from "@/components/crm/tabaccai/TabaccaioPrivacy";
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
        .from("tabaccai")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        router.replace("/tabaccai");
        return;
      }

      const canali = (data.canali_consenso || "").split(",");

      setForm({
        ...data,
        consenso_whatsapp: canali.includes("whatsapp"),
        consenso_email: canali.includes("email"),
        consenso_telefono: canali.includes("telefono"),
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

    const canali: string[] = [];
    if (form.consenso_whatsapp) canali.push("whatsapp");
    if (form.consenso_email) canali.push("email");
    if (form.consenso_telefono) canali.push("telefono");

    const payload = {
      ragione_sociale: form.ragione_sociale ?? null,
      titolare: form.titolare ?? null,
      comune: form.comune ?? null,
      provincia: form.provincia ?? null,
      indirizzo: form.indirizzo ?? null,
      cap: form.cap ?? null,
      numero_rivendita: form.numero_rivendita ?? null,

      telefono: form.telefono ?? null,
      cellulare: form.cellulare ?? null,
      email: form.email ?? null,
      pec: form.pec ?? null,

      stato_consenso: form.stato_consenso ?? "mai_chiesto",
      canali_consenso: canali.length ? canali.join(",") : null,
      modalita_consenso: form.consenso_nota ?? null,

      stato_supreme: form.stato_supreme ?? null,
      interesse_supreme: form.interesse_supreme ?? null,
      priorita: form.priorita ?? "media",

      prossima_azione: form.prossima_azione ?? null,
      data_prossima_azione: form.data_prossima_azione ?? null,
      nota_prossima_azione: form.nota_prossima_azione ?? null,

      tipo_attivita: form.tipo_attivita ?? null,
      dimensione_attivita: form.dimensione_attivita ?? null,
      zona_attivita: form.zona_attivita ?? null,
      afflusso_attivita: form.afflusso_attivita ?? null,
      potenziale_commerciale: form.potenziale_commerciale ?? null,
      categoria_cliente: form.categoria_cliente ?? null,
      marchi_trattati: form.marchi_trattati ?? null,
      altro_1: form.altro_1 ?? null,
      altro_2: form.altro_2 ?? null,
      altro_3: form.altro_3 ?? null,

      note: form.note ?? null,
    };

    const { error } = await supabase
      .from("tabaccai")
      .update(payload)
      .eq("id", id);

    setSaving(false);

    if (error) {
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
      .from("tabaccai")
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
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <TabaccaioHeader
        id={form.id}
        ragione_sociale={form.ragione_sociale}
        titolare={form.titolare}
        comune={form.comune}
        provincia={form.provincia}
        indirizzo={form.indirizzo}
        cap={form.cap}
        numero_rivendita={form.numero_rivendita}
        onChange={(v) => setForm({ ...form, ...v })}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8 lg:col-span-2">
          <TabaccaioContatti
            telefono={form.telefono}
            cellulare={form.cellulare}
            email={form.email}
            pec={form.pec}
            partita_iva={form.partita_iva}
            codice_fiscale={form.codice_fiscale}
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

          <TabaccaioPrivacy
            consenso_stato={form.stato_consenso}
            consenso_whatsapp={form.consenso_whatsapp}
            consenso_email={form.consenso_email}
            consenso_telefono={form.consenso_telefono}
            consenso_nota={form.consenso_nota}
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
            altro_1={form.altro_1}
            altro_2={form.altro_2}
            altro_3={form.altro_3}
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
