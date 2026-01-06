import { notFound } from "next/navigation";
import ClienteScadenzeSection from "@/app/components/scadenze/ClienteScadenzeSection";
import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client (server-side)
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Tipologia Cliente PHONESIA
 */
type Cliente = {
  id: number;
  nome: string;
  cognome?: string | null;
  telefono?: string | null;
  email?: string | null;
  codice_fiscale?: string | null;
  created_at: string;
};

/**
 * Recupera cliente per ID
 */
async function getCliente(id: number): Promise<Cliente | null> {
  const { data, error } = await supabase
    .from("acq_clienti")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Cliente;
}

/**
 * Pagina cliente PHONESIA
 */
export default async function ClientePhonesiaPage({
  params,
}: {
  params: { id: string };
}) {
  const clienteId = Number(params.id);

  if (Number.isNaN(clienteId)) {
    notFound();
  }

  const cliente = await getCliente(clienteId);

  if (!cliente) {
    notFound();
  }

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      {/* HEADER */}
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600 }}>
          {cliente.nome} {cliente.cognome || ""}
        </h1>
        <p style={{ color: "#666" }}>
          Cliente PHONESIA • acquisito il{" "}
          {new Date(cliente.created_at).toLocaleDateString()}
        </p>
      </header>

      {/* DATI BASE */}
      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <h2 style={{ marginBottom: 12 }}>Dati cliente</h2>

        <div style={{ display: "grid", gap: 8 }}>
          <div>
            <strong>Telefono:</strong> {cliente.telefono || "—"}
          </div>

          <div>
            <strong>Email:</strong> {cliente.email || "—"}
          </div>

          <div>
            <strong>Codice fiscale:</strong>{" "}
            {cliente.codice_fiscale || "—"}
          </div>
        </div>
      </section>

      {/* EVENTI / SCADENZE */}
      <ClienteScadenzeSection clienteId={cliente.id} />

      {/* SPAZIO FUTURO */}
      <section
        style={{
          marginTop: 32,
          padding: 16,
          border: "1px dashed #ccc",
          borderRadius: 8,
          color: "#999",
        }}
      >
        <p>
          Qui in futuro entreranno:
          <br />• WhatsApp
          <br />• Email
          <br />• Storico contatti
        </p>
      </section>
    </div>
  );
}
