import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function normalizePhone(input: string): string {
  let telefono = input.trim();

  telefono = telefono
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/-/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "");

  if (!telefono.startsWith("+")) {
    telefono = `+39${telefono}`;
  }

  return telefono;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, telefono, consent } = body;

    if (!telefono || consent !== true) {
      return NextResponse.json(
        { error: "Dati non validi" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const telefonoNorm = normalizePhone(telefono);

    // 1️⃣ cerco tabaccaio per telefono
    const { data: existing } = await supabase
      .from("tabaccai")
      .select("id")
      .eq("telefono", telefonoNorm)
      .maybeSingle();

    let tabaccaioId: number;

    if (existing) {
      tabaccaioId = existing.id;

      // aggiorno nome se arriva dal biglietto
      if (nome) {
        await supabase
          .from("tabaccai")
          .update({ ragione_sociale: nome })
          .eq("id", tabaccaioId);
      }
    } else {
      // 2️⃣ creo nuovo tabaccaio
      const { data: created } = await supabase
        .from("tabaccai")
        .insert({
          ragione_sociale: nome || "Contatto Biglietto",
          telefono: telefonoNorm,
        })
        .select("id")
        .single();

      if (!created) {
        throw new Error("Errore creazione tabaccaio");
      }

      tabaccaioId = created.id;
    }

    // 3️⃣ registro consenso
    await supabase.from("privacy_consents").insert({
      tabaccaio_id: tabaccaioId,
      consent: true,
      source: "biglietto",
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Errore consenso biglietto:", err);
    return NextResponse.json(
      { error: "Errore server" },
      { status: 500 }
    );
  }
}