"use client";

import { useState } from "react";

export default function EmailTestPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Prova email Suprem-e CRM");
  const [message, setMessage] = useState("Questa è una email di prova inviata dal Suprem-e CRM.");
  const [loading, setLoading] = useState(false);
  const [esito, setEsito] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setEsito(null);
    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          text: message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setEsito(data.error || "Errore nell'invio.");
      } else {
        setEsito("Email inviata con successo ✅");
      }
    } catch (err) {
      console.error(err);
      setEsito("Errore di rete.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white border rounded-xl shadow-sm p-6 mt-6">
      <h1 className="text-xl font-bold mb-2">Test invio email</h1>
      <p className="text-xs text-gray-500 mb-4">
        Usa questa pagina per verificare la configurazione della casella Aruba.
      </p>

      <form onSubmit={handleSend} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">
            Destinatario
          </label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 text-sm"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="es. la-tua-mail@crm-supreme.it"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Oggetto
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Messaggio
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm h-28"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {esito && (
          <p className="text-sm mt-1">
            {esito.startsWith("Email inviata")
              ? <span className="text-green-700">{esito}</span>
              : <span className="text-red-600">{esito}</span>}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Invio in corso..." : "Invia email di prova"}
        </button>
      </form>
    </div>
  );
}