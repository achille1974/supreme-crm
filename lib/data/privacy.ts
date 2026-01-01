import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function hasPrivacyConsent(tabaccaioId: number): Promise<boolean> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("privacy_consents")
    .select("consent")
    .eq("tabaccaio_id", tabaccaioId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return false;

  return data.consent === true;
}