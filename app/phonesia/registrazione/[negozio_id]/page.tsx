"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// normalizzazione telefono (anti-doppioni)
function normalizePhone(v: string) {
  let x = v.replace(/[^\d+]/g, "");
  if (!x.startsWith("+")) x = "+39" + x;
  if (!x.startsWith("+39")) x = "+39" + x.replace(/^\+/, "");
  return x;
}

export default function RegistrazioneClientePage() {
  const { negozio_id } = useParams<{ negozio_id: string }>();

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    codice_fiscale: "",
    telefono: "+39",
    email: "",
    consenso: false,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.consenso) {
      setError("Per continuare è necessario autorizzare il consenso.");
      return;
    }

    setLoading(true);

    const { data: cliente, error: errCliente } = await supabase
      .from("acq_clienti")
      .insert({
        azienda_id: 1, // PHONESIA
        negozio_id,
        nome: form.nome.trim(),
        cognome: form.cognome.trim(),
        codice_fiscale: form.codice_fiscale.trim().toUpperCase(),
        telefono: normalizePhone(form.telefono),
        email: form.email.trim().toLowerCase(),
        origine: "qr",
      })
      .select()
      .single();

    if (errCliente) {
      setLoading(false);
      if ((errCliente as any).code === "23505") {
        setError("Sei già registrato. Grazie!");
      } else {
        setError("Errore durante la registrazione. Riprova.");
      }
      return;
    }

    await supabase.from("acq_consensi").insert({
      cliente_id: cliente.id,
      negozio_id,
      origine: "qr",
      canali_autorizzati: "whatsapp,email,telefono",
      testo_consenso:
        "Autorizzo PHONESIA a contattarmi tramite WhatsApp, email e telefono per comunicazioni informative e commerciali relative alle proprie attività e iniziative.",
    });

    setLoading(false);
    setOk(true);
  }

  if (ok) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <h1 style={styles.title}>Grazie!</h1>
          <p style={styles.text}>
            La registrazione è avvenuta con successo.
            <br />
            PHONESIA rimane a tua disposizione.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <img
  src="/phonesia/logo-phonesia.png"
  alt="PHONESIA"
  style={{ maxWidth: 160, marginBottom: 16 }}
/>


        <h1 style={styles.title}>Registrazione Cliente</h1>

        <p style={styles.text}>
          Compila il modulo per restare in contatto con PHONESIA e ricevere
          comunicazioni utili sulle nostre iniziative.
        </p>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Nome"
            required
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Cognome"
            required
            value={form.cognome}
            onChange={e => setForm({ ...form, cognome: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Codice fiscale"
            required
            value={form.codice_fiscale}
            onChange={e => setForm({ ...form, codice_fiscale: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Telefono"
            required
            value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={form.consenso}
              onChange={e => setForm({ ...form, consenso: e.target.checked })}
            />
            <span>
              Autorizzo PHONESIA a contattarmi tramite WhatsApp, email e telefono
              per comunicazioni informative e commerciali relative alle proprie
              attività e iniziative.
            </span>
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} disabled={loading}>
            {loading ? "Invio in corso..." : "Invia"}
          </button>
        </form>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f6f7fb, #e9ecf5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    maxWidth: 420,
    width: "100%",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  checkbox: {
    display: "flex",
    gap: 8,
    fontSize: 12,
    textAlign: "left",
  },
  button: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
  error: {
    color: "crimson",
    fontSize: 13,
  },
};
