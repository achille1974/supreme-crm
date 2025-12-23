"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BigliettoDigitale() {
const searchParams = useSearchParams();
const tabaccaio_id = searchParams.get("tabaccaio_id");

const [tabaccaio, setTabaccaio] = useState<any>(null);
const [loading, setLoading] = useState(true);

// ⚡ Recupera dati tabaccaio
useEffect(() => {
async function load() {
if (!tabaccaio_id) return;

const { data } = await supabase
.from("tabaccai")
.select("*")
.eq("id", tabaccaio_id)
.single();

setTabaccaio(data);
setLoading(false);
}

load();
}, [tabaccaio_id]);

async function registraConsenso(tipo: "whatsapp" | "email") {
if (!tabaccaio_id) return;

const { error } = await supabase
.from("tabaccai")
.update({
consenso_marketing: true,
consenso_canale: tipo,
consenso_data: new Date().toISOString(),
})
.eq("id", tabaccaio_id);

if (!error) alert("✔ Consenso registrato correttamente!");
else alert("Errore nel salvataggio del consenso.");
}

if (loading) return <p style={{ color: "white" }}>Caricamento…</p>;

return (
<main
style={{
minHeight: "100vh",
padding: "20px",
background: "linear-gradient(180deg, #000000, #111111, #0B0B0B)",
color: "white",
fontFamily: "system-ui",
}}
>
{/* ⭐ HEADER */}
<div style={{ textAlign: "center", marginBottom: "25px" }}>
<div
style={{
width: "140px",
height: "140px",
margin: "0 auto",
borderRadius: "50%",
border: "4px solid #D4AF37",
boxShadow: "0 0 20px #D4AF37AA",
overflow: "hidden",
}}
>
{/* FOTO ACHILLE - SEGNAPOSTO */}
<img
src="https://supabase-photo-achille"
style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
</div>

<h1
style={{
fontSize: "26px",
fontWeight: 700,
marginTop: "15px",
color: "#D4AF37",
textShadow: "0 0 8px rgba(212,175,55,0.6)",
}}
>
Achille Beltrami
</h1>

<p style={{ fontSize: "14px", color: "#A1A1A6" }}>
Consulente Suprem-e per Tabaccai
</p>

<p style={{ fontSize: "13px", marginTop: "4px", color: "#F5F5F7" }}>
Soluzioni dedicate per liquidi e sigarette elettroniche
</p>
</div>

{/* ⭐ LOGO TABACCHERIA */}
<div style={{ textAlign: "center", marginBottom: "20px" }}>
<img
src="https://supabase-logo-tabaccheria"
style={{
width: "180px",
margin: "0 auto",
filter: "drop-shadow(0 0 8px #D4AF37CC)",
}}
/>

<p style={{ marginTop: "10px", fontSize: "13px", color: "#F5F5F7" }}>
Tabaccheria Beltrami n.1 • Dal 1876
</p>
<p style={{ fontSize: "13px", color: "#A1A1A6" }}>
Via Archimede 202, Floridia (SR)
</p>
</div>

{/* ⭐ CONTATTI */}
<div style={{ marginTop: "25px" }}>
<h2
style={{
color: "#D4AF37",
marginBottom: "10px",
textShadow: "0 0 6px rgba(212,175,55,0.7)",
}}
>
Contatti rapidi
</h2>

<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
<a
href={`tel:3473214561`}
style={buttonGlow}
>
📞 Chiama
</a>

<a
href={`https://wa.me/393473214561`}
style={buttonGlow}
>
💬 WhatsApp
</a>

<a href="mailto:achille.beltrami@crm-supreme.it" style={buttonGlow}>
✉️ Email
</a>

<a
href="https://maps.app.goo.gl/kcY2cBq3c7Zk8JFo8"
target="_blank"
style={buttonGlow}
>
📍 Naviga alla tabaccheria
</a>
</div>
</div>

{/* ⭐ COLLABORATORI */}
<div style={{ marginTop: "40px" }}>
<h2
style={{
color: "#D4AF37",
textShadow: "0 0 6px rgba(212,175,55,0.7)",
}}
>
Collaboratori
</h2>

<p style={{ fontSize: "12px", color: "#A1A1A6" }}>
(Verranno caricati con foto e WhatsApp)
</p>

<div style={{ marginTop: "10px" }}>
{/* SEGNAPOSTO PER COLLABORATORI */}
<div style={collaboratoreCard}>
<div style={collaboratoreFoto}>
<img
src="https://supabase-collaboratore-1"
style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
</div>

<div>
<p style={{ fontWeight: 600 }}>Nome Cognome</p>
<p style={{ fontSize: "12px", color: "#A1A1A6" }}>Consulente</p>

<a
href="https://wa.me/39XXXX"
style={{ ...buttonGlowSmall, marginTop: "4px" }}
>
WhatsApp
</a>
</div>
</div>
</div>
</div>

{/* ⭐ CONSENSI */}
<div style={{ marginTop: "40px" }}>
<h2
style={{
color: "#D4AF37",
textShadow: "0 0 6px rgba(212,175,55,0.7)",
}}
>
Consenso alle comunicazioni
</h2>

<p style={{ fontSize: "12px", color: "#A1A1A6" }}>
Seleziona come desideri ricevere gli aggiornamenti.
</p>

<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
<button
onClick={() => registraConsenso("whatsapp")}
style={buttonGlow}
>
✔ Consenso per WhatsApp
</button>

<button onClick={() => registraConsenso("email")} style={buttonGlow}>
✔ Consenso per Email
</button>
</div>
</div>

{/* FOOTER */}
<div style={{ marginTop: "40px", textAlign: "center", opacity: 0.5 }}>
<p style={{ fontSize: "12px" }}>Powered by CRM Supreme</p>
</div>
</main>
);
}

const buttonGlow: any = {
background: "#D4AF37",
padding: "12px",
borderRadius: "10px",
textAlign: "center",
color: "#000",
fontWeight: 700,
fontSize: "14px",
boxShadow: "0 0 12px rgba(212,175,55,0.7)",
};

const buttonGlowSmall: any = {
background: "#D4AF37",
padding: "6px 10px",
borderRadius: "8px",
textAlign: "center",
color: "#000",
fontWeight: 600,
fontSize: "12px",
boxShadow: "0 0 10px rgba(212,175,55,0.6)",
};

const collaboratoreCard: any = {
display: "flex",
alignItems: "center",
background: "#111",
borderRadius: "12px",
padding: "10px",
boxShadow: "0 0 10px rgba(212,175,55,0.3)",
marginBottom: "12px",
};

const collaboratoreFoto: any = {
width: "55px",
height: "55px",
borderRadius: "50%",
border: "3px solid #D4AF37",
boxShadow: "0 0 10px rgba(212,175,55,0.5)",
overflow: "hidden",
marginRight: "12px",
};