// FILE: supabase/functions/send-whatsapp/index.ts
// Funzione Edge per inviare messaggi WhatsApp usando Meta Cloud API

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
try {
const { to, body } = await req.json();

if (!to || !body) {
return new Response(
JSON.stringify({ error: "Missing fields 'to' or 'body'" }),
{ status: 400 }
);
}

// Variabili ambiente
const token = Deno.env.get("META_WA_TOKEN"); // <= Access token Meta
const phoneId = Deno.env.get("META_WA_PHONE_ID"); // <= ID telefono WhatsApp Cloud API

if (!token || !phoneId) {
return new Response(
JSON.stringify({ error: "Missing META_WA_TOKEN or META_WA_PHONE_ID" }),
{ status: 500 }
);
}

// API Meta WhatsApp Cloud
const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`;

const payload = {
messaging_product: "whatsapp",
to,
type: "text",
text: { body },
};

const res = await fetch(url, {
method: "POST",
headers: {
Authorization: `Bearer ${token}`,
"Content-Type": "application/json",
},
body: JSON.stringify(payload),
});

const data = await res.json();

if (!res.ok) {
return new Response(JSON.stringify({ error: data }), { status: 500 });
}

return new Response(JSON.stringify({ success: true, data }), {
status: 200,
});

} catch (err) {
return new Response(
JSON.stringify({ error: err?.message || "Unexpected error" }),
{ status: 500 }
);
}
});