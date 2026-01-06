import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ClienteRow = {
  id: number;
  nome: string;
  cognome?: string | null;
  telefono?: string | null;
  created_at: string;
};

async function getClienti(): Promise<ClienteRow[]> {
  const { data } = await supabase
    .from("acq_clienti")
    .select("id,nome,cognome,telefono,created_at")
    .order("created_at", { ascending: false });

  return (data || []) as ClienteRow[];
}

export default async function ClientiPhonesiaPage() {
  const clienti = await getClienti();

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>
        Clienti PHONESIA
      </h1>

      {clienti.length === 0 && (
        <p>Nessun cliente presente.</p>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Nome</th>
            <th align="left">Telefono</th>
            <th align="left">Acquisizione</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clienti.map((c) => (
            <tr key={c.id} style={{ borderTop: "1px solid #eee" }}>
              <td>
                {c.nome} {c.cognome || ""}
              </td>
              <td>{c.telefono || "—"}</td>
              <td>
                {new Date(c.created_at).toLocaleDateString()}
              </td>
              <td>
                <Link href={`/phonesia/clienti/${c.id}`}>
                  Apri →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
