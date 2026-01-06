import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const titolo = String(formData.get("titolo") || "").trim();
    const messaggio = String(formData.get("messaggio") || "").trim();
    const canale = String(formData.get("canale") || "").trim();
    const pubblico = String(formData.get("pubblico") || "").trim();

    if (!titolo || !messaggio || !canale || !pubblico) {
      return NextResponse.json(
        { error: "Dati mancanti" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("acq_azioni").insert({
      azienda_id: 1,
      titolo,
      messaggio,
      canale,
      pubblico,
      stato: "bozza",
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/phonesia/dashboard?tab=azioni", req.url)
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    );
  }
}
