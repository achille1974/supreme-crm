import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient();

  const {
    tabaccaio_id,
    testo,
  }: { tabaccaio_id: number; testo: string } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Non autenticato" },
      { status: 401 }
    );
  }

  const { error } = await supabase.from("crm_note").insert({
    tabaccaio_id,
    testo,
    created_by: user.email,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}