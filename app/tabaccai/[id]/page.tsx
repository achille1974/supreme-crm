"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import TagEditor from "../../components/TagEditor";

// URL base CRM
const APP_BASE_URL = "https://app.crm-supreme.it";

// Template messaggio
const DEFAULT_WHATSAPP_TEMPLATE = `Ciao, sono Achille Beltrami 👋

Ti mando il mio biglietto digitale come referente Suprem-e per la tua tabaccheria "{{RAGIONE_SOCIALE}}".

All'interno trovi i miei contatti e un modulo per darmi il consenso a ricevere aggiornamenti mirati su liquidi e sigarette elettroniche.

Dai un'occhiata quando hai un attimo 😊

{{LINK_BIGLIETTO}}`;

type Tabaccaio = {
id: number;
ragione_sociale: string | null;
comune: string | null;
indirizzo: string | null;
telefono_fisso: string | null;
cellulare: string | null;
whatsapp_numero: string | null;
stato_relazione_supreme: string | null;
interesse_supreme: string | null;
punteggio_potenziale: number | null;
tratta_ecig: boolean | null;
tratta_liquidi: boolean | null;

consenso_marketing: boolean | null;
consenso_canale: string | null;
consenso_data: string | null;

tag_attivita: string[] | null;
};

const STATO_OPZIONI = [
"",
"Primo contatto",
"In valutazione",
"In trattativa",
"Cliente attivo",
"Cliente perso",
];

const INTERESSE_OPZIONI = ["", "Basso", "Medio", "Alto", "Non interessato"];

export default function TabaccaioDettaglioPage() {
const params = useParams<{ id: string }>();
const id = Number(params?.id);

const [tabaccaio, setTabaccaio] = useState<Tabaccaio | null>(null);
const [loading, setLoading] = useState(true);
const [errore, setErrore] = useState<string | null>(null);
const [salvato, setSalvato] = useState(false);

// Carica scheda tabaccaio
useEffect(() => {
async function load() {
const { data, error } = await supabase
.from("tabaccai")
.select("*")
.eq("id", id)
.single();

if (error) setErrore("Impossibile caricare il tabaccaio.");
else setTabaccaio(data as Tabaccaio);

setLoading(false);
}
load();
}, [id]);

function handleChange<K extends keyof Tabaccaio>(
key: K,
value: Tabaccaio[K]
) {
setTabaccaio((prev) => prev ? { ...prev, [key]: value } : prev);
}

// Salva modifiche
async function salvaModifiche(e: React.FormEvent) {
e.preventDefault();
if (!tabaccaio) return;

const { id: tid, ...payload } = tabaccaio;

const { error } = await supabase
.from("tabaccai")
.update(payload)
.eq("id", tid);

if (error) setErrore("Errore nel salvataggio.");
else {
setSalvato(true);
setTimeout(() => setSalvato(false), 1500);
}
}

// INVIO AUTOMATICO WHATSAPP TRAMITE EDGE FUNCTION
async function inviaBigliettoAutomatico() {
if (!tabaccaio) return;

let numero = tabaccaio.whatsapp_numero || tabaccaio.cellulare;
if (!numero) {
alert("Numero WhatsApp non disponibile.");
return;
}

numero = numero.replace(/\D/g, "");
if (!numero.startsWith("39")) numero = "39" + numero;

const linkBiglietto = `${APP_BASE_URL}/biglietto-digitale?tabaccaio_id=${tabaccaio.id}`;

let msg = DEFAULT_WHATSAPP_TEMPLATE
.replace(/{{RAGIONE_SOCIALE}}/g, tabaccaio.ragione_sociale || "")
.replace(/{{COMUNE}}/g, tabaccaio.comune || "")
.replace(/{{LINK_BIGLIETTO}}/g, linkBiglietto);

// CHIAMATA ALLA EDGE FUNCTION
const response = await fetch(
"https://rhemerlnszwhrjzicesd.supabase.co/functions/v1/send-whatsapp",
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
to: "+" + numero,
message: msg,
}),
}
);

const data = await response.json();

if (!response.ok) {
alert("❌ Errore nell'invio WhatsApp: " + data.error);
return;
}

alert("📩 Messaggio WhatsApp inviato correttamente!");

// REGISTRA INTERAZIONE AUTOMATICA
await supabase.from("interazioni").insert({
tabaccaio_id: tabaccaio.id,
canale: "whatsapp",
oggetto: "Invio biglietto digitale",
esito: "OK",
note: "",
});
}

if (loading) return <p>Caricamento…</p>;

if (errore)
return (
<main>
<p className="text-red-600">{errore}</p>
<Link href="/tabaccai">← Torna alla lista</Link>
</main>
);

if (!tabaccaio)
return (
<main>
<p>Tabaccaio non trovato.</p>
<Link href="/tabaccai">← Torna alla lista</Link>
</main>
);

return (
<main className="space-y-4">
<div className="flex justify-between">
<h1 className="text-xl font-bold">
Scheda – {tabaccaio.ragione_sociale}
</h1>

<Link href="/tabaccai" className="text-blue-600 underline text-sm">
← Torna alla lista
</Link>
</div>

{/* FORM */}
<form onSubmit={salvaModifiche} className="border rounded p-3 bg-white space-y-3">
<h2 className="font-semibold">Dati tabaccaio</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<div>
<label>Ragione sociale</label>
<input
className="w-full border rounded px-2 py-1"
value={tabaccaio.ragione_sociale || ""}
onChange={(e) => handleChange("ragione_sociale", e.target.value)}
/>
</div>

<div>
<label>Comune</label>
<input
className="w-full border rounded px-2 py-1"
value={tabaccaio.comune || ""}
onChange={(e) => handleChange("comune", e.target.value)}
/>
</div>

<div>
<label>Indirizzo</label>
<input
className="w-full border rounded px-2 py-1"
value={tabaccaio.indirizzo || ""}
onChange={(e) => handleChange("indirizzo", e.target.value)}
/>
</div>

<div>
<label>Cellulare</label>
<input
className="w-full border rounded px-2 py-1"
value={tabaccaio.cellulare || ""}
onChange={(e) => handleChange("cellulare", e.target.value)}
/>
</div>

<div>
<label>WhatsApp</label>
<input
className="w-full border rounded px-2 py-1"
value={tabaccaio.whatsapp_numero || ""}
onChange={(e) => handleChange("whatsapp_numero", e.target.value)}
/>
</div>

{/* Stato */}
<div>
<label>Stato Suprem-e</label>
<select
className="w-full border rounded px-2 py-1"
value={tabaccaio.stato_relazione_supreme || ""}
onChange={(e) => handleChange("stato_relazione_supreme", e.target.value)}
>
{STATO_OPZIONI.map((s) => (
<option key={s} value={s}>
{s || "—"}
</option>
))}
</select>
</div>

{/* Interesse */}
<div>
<label>Interesse Suprem-e</label>
<select
className="w-full border rounded px-2 py-1"
value={tabaccaio.interesse_supreme || ""}
onChange={(e) => handleChange("interesse_supreme", e.target.value)}
>
{INTERESSE_OPZIONI.map((s) => (
<option key={s}>{s || "—"}</option>
))}
</select>
</div>
</div>

{/* Tag */}
<div>
<label className="font-medium">Tag attività</label>
<TagEditor
value={tabaccaio.tag_attivita || []}
onChange={(tags) => handleChange("tag_attivita", tags)}
/>
</div>

<button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" type="submit">
Salva modifiche
</button>

{salvato && (
<span className="text-green-700 text-sm ml-2">✔ Salvato con successo</span>
)}
</form>

{/* CONSENSI */}
<section className="border rounded p-3 bg-gray-50 text-sm">
<h2 className="font-semibold">Consensi</h2>

{tabaccaio.consenso_marketing ? (
<p>
✔ Consenso presente – via {tabaccaio.consenso_canale} il{" "}
{tabaccaio.consenso_data}
</p>
) : (
<p>Nessun consenso registrato.</p>
)}
</section>

{/* BIGLIETTO DIGITALE */}
<section className="border rounded p-3 bg-white">
<h2 className="font-semibold">Biglietto digitale</h2>

<button
onClick={inviaBigliettoAutomatico}
className="px-3 py-1 mt-2 bg-green-600 text-white rounded text-sm"
>
WhatsApp: invia biglietto
</button>
</section>
</main>
);
}