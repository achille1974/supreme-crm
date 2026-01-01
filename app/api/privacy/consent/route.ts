import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { tabaccaioId, source } = await req.json();

    if (!tabaccaioId) {
      return NextResponse.json(
        { error: "tabaccaioId mancante" },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { error } = await supabase.from("privacy_consents").insert({
      tabaccaio_id: tabaccaioId,
      consent: true,
      source: source ?? "digital_card",
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}