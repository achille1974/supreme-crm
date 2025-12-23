import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("Configurazione SMTP mancante");
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: process.env.SMTP_SECURE === "true", // true se usi 465
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: NextRequest) {
  // consento l'invio solo se sei loggato nel CRM
  const authCookie = request.cookies.get("crm-auth");
  if (authCookie?.value !== "1") {
    return NextResponse.json(
      { error: "Non autorizzato." },
      { status: 401 }
    );
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const to = body.to as string | undefined;
  const subject = body.subject as string | undefined;
  const text = body.text as string | undefined;
  const html = body.html as string | undefined;

  if (!to || !subject || (!text && !html)) {
    return NextResponse.json(
      { error: "Dati email mancanti." },
      { status: 400 }
    );
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  try {
    const transporter = createTransport();

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Errore invio email:", err);

    let msg = "Errore nell'invio dell'email.";
    if (err instanceof Error) {
      msg = err.message;
    } else if (typeof err === "string") {
      msg = err;
    }

    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}