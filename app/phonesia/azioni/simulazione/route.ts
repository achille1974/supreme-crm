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

    // 1) azione
    const { data: azione } = await supabase
      .from("acq_azioni")
      .select("id, titolo, messaggio, canale")
      .eq("id", azione_id)
      .single();

    if (!azione) {
      return NextResponse.json(
        { error: "Azione non trovata" },
        { status: 404 }
      );
    }

    // 2) clienti selezionati
    const { data: righe } = await supabase
      .from("acq_azioni_clienti")
      .select("cliente_id")
      .eq("azione_id", azione_id)
      .eq("stato", "pronto");

    const righeSafe = righe ?? [];
    const clientiTotali = righeSafe.length;

    // 3) breakdown canali (logico, non reale)
    let whatsapp = 0;
    let email = 0;

    if (azione.canale === "whatsapp") whatsapp = clientiTotali;
    if (azione.canale === "email") email = clientiTotali;
    if (azione.canale === "entrambi") {
      whatsapp = clientiTotali;
      email = clientiTotali;
    }

    return NextResponse.json({
      titolo: azione.titolo,
      messaggio: azione.messaggio,
      totali: clientiTotali,
      canali: { whatsapp, email },
    });
  } catch {
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    );
  }
}
