import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function hasConsent(
  tabaccaioId: number,
  canale: "whatsapp" | "email"
): Promise<boolean> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("consensi")
    .select("id")
    .eq("tabaccaio_id", tabaccaioId)
    .eq("canale", canale)
    .eq("consenso", true)
    .limit(1);

  if (error) return false;

  return (data?.length ?? 0) > 0;
}