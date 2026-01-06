import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { azione_id } = await req.json();

    if (!azione_id) {
      return NextResponse.json(
        { error: "ID azione mancante" },
        { status: 400 }
      );
    }

    // 1️⃣ recupera azione
    const { data: azione, error: azioneError } = await supabase
      .from("acq_azioni")
      .select("id, pubblico")
      .eq("id", azione_id)
      .single();

    if (azioneError || !azione) {
      return NextResponse.json(
        { error: "Azione non trovata" },
        { status: 404 }
      );
    }

    // 2️⃣ attiva azione
    await supabase
      .from("acq_azioni")
      .update({ stato: "attiva" })
      .eq("id", azione_id);

    // 3️⃣ selezione clienti (automatica)
    let clientiQuery = supabase
      .from("acq_clienti")
      .select("id");

    if (azione.pubblico === "nuovi") {
      clientiQuery = clientiQuery.gte(
        "created_at",
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      );
    }

    if (azione.pubblico === "inattivi") {
      clientiQuery = clientiQuery.not(
        "id",
        "in",
        supabase.from("acq_log_messaggi").select("cliente_id")
      );
    }

    const { data: clienti } = await clientiQuery;
    const clientiSafe = clienti ?? [];

    // 4️⃣ inserisce clienti selezionati
    if (clientiSafe.length > 0) {
      const rows = clientiSafe.map((c) => ({
        azione_id,
        cliente_id: c.id,
      }));

      await supabase
        .from("acq_azioni_clienti")
        .insert(rows, { ignoreDuplicates: true });
    }

    // 5️⃣ log
    await supabase.from("acq_log_azioni").insert({
      azione_id,
      evento: "AZIONE_ATTIVATA",
      note: `Clienti selezionati: ${clientiSafe.length}`,
    });

    return NextResponse.json({
      success: true,
      clienti_selezionati: clientiSafe.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    );
  }
}
