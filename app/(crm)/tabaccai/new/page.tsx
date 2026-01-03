"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// COMPONENTI UI
import TabaccaioHeader from "@/components/crm/tabaccai/TabaccaioHeader";
import TabaccaioContatti from "@/components/crm/tabaccai/TabaccaioContatti";
import TabaccaioPrivacy from "@/components/crm/tabaccai/TabaccaioPrivacy";
import TabaccaioStato from "@/components/crm/tabaccai/Stato";
import TabaccaioNote from "@/components/crm/tabaccai/Note";
import Classificazione from "@/components/crm/tabaccai/Classificazione";
import TabaccaioActions from "@/components/crm/tabaccai/TabaccaioActions";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NuovoTabaccaioPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  // 🔒 Stato unico della scheda (UI completa)
  const [form, setForm] = useState<any>({
    stato_consenso: "mai_chiesto",
    priorita: "media",
  });

  /* =========================
     SAVE — VERSIONE STABILE
     Compatibile tabaccai_master
  ========================= */
  async function save() {
    if (saving) return;
    setSaving(true);

    // 🔐 Costruzione canali consenso (array)
    const canali: string[] = [];
    if (form.consenso_whatsapp) canali.push("whatsapp");
    if (form.consenso_email) canali.push("email");
    if (form.consenso_telefono) canali.push("telefono");

    // ✅ PAYLOAD DEFINITIVO v1 (solo colonne master sicure)
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

      // PRIVACY
      stato_consenso: form.stato_consenso ?? "mai_chiesto",
      canali_consenso: canali.length ? canali : null,
      modalita_consenso: form.consenso_nota || null,

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

    const { data, error } = await supabase
      .from("tabaccai_master")
      .insert(payload)
      .select("id");

    setSaving(false);

    if (error) {
      console.error("ERRORE INSERT:", error);
      alert(error.message);
      return;
    }

    if (!data || !data[0]?.id) {
      alert("Inserimento riuscito ma ID non ritornato");
      return;
    }

    // ✅ Redirect alla scheda
    router.push(`/tabaccai/${data[0].id}`);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* =========================
          HEADER / ANAGRAFICA
      ========================= */}
      <TabaccaioHeader
        id={0}
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
        {/* =========================
            COLONNA SINISTRA
        ========================= */}
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

        {/* =========================
            COLONNA DESTRA
        ========================= */}
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

      {/* =========================
          ACTION BAR
      ========================= */}
      <TabaccaioActions
        onSave={save}
        saving={saving}
        onBack={() => router.push("/tabaccai")}
        cellulare={form.cellulare || form.telefono}
      />
    </div>
  );
}
