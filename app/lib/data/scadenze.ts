import { createClient } from "@supabase/supabase-js";
import { Scadenza } from "@/lib/types/scadenza";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 📌 Lista scadenze per cliente
export async function getScadenzeByCliente(clienteId: number) {
  const { data, error } = await supabase
    .from("acq_scadenze")
    .select("*")
    .eq("cliente_id", clienteId)
    .order("data_scadenza", { ascending: true });

  if (error) throw error;
  return data as Scadenza[];
}

// ➕ Crea scadenza
export async function createScadenza(payload: {
  cliente_id: number;
  tipo_scadenza: string;
  data_scadenza: string;
  descrizione?: string;
}) {
  const { error } = await supabase.from("acq_scadenze").insert({
    ...payload,
    stato: "attiva",
  });

  if (error) throw error;
}

// ✏️ Aggiorna scadenza
export async function updateScadenza(
  id: number,
  payload: Partial<Omit<Scadenza, "id" | "cliente_id" | "created_at">>
) {
  const { error } = await supabase
    .from("acq_scadenze")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
}

// ✅ Segna come gestita
export async function markScadenzaGestita(id: number) {
  const { error } = await supabase
    .from("acq_scadenze")
    .update({ stato: "gestita" })
    .eq("id", id);

  if (error) throw error;
}
