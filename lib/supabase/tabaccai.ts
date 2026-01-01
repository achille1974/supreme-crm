import { supabase } from "./client";

export async function getTabaccaioById(id: number) {
  const { data, error } = await supabase
    .from("tabaccai")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Errore Supabase:", error);
    return null;
  }

  return data;
}