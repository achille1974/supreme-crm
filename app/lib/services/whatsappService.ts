import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM!; 
// es: "whatsapp:+14155238886"

const client = twilio(accountSid, authToken);

export async function sendWhatsApp(
  to: string,
  body: string
): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    const message = await client.messages.create({
      from: fromWhatsApp,
      to: `whatsapp:${to}`,
      body,
    });

    return {
      success: true,
      sid: message.sid,
    };
  } catch (err: any) {
    console.error("Twilio WhatsApp error:", err?.message || err);
    return {
      success: false,
      error: err?.message || "Errore invio WhatsApp",
    };
  }
}
