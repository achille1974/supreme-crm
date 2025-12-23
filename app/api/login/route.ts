import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = (body as any)?.password as string | undefined;

    const validPassword = process.env.CRM_ACCESS_PASSWORD;

    if (!validPassword) {
      console.error("CRM_ACCESS_PASSWORD non è impostata");
      return NextResponse.json(
        { error: "Password non configurata sul server." },
        { status: 500 }
      );
    }

    if (!password || password !== validPassword) {
      return NextResponse.json(
        { error: "Password errata." },
        { status: 401 }
      );
    }

    // Password corretta → settiamo cookie di sessione
    const res = NextResponse.json({ ok: true });

    res.cookies.set("crm-auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 ore
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Errore interno /api/login:", err);
    return NextResponse.json(
      { error: "Errore interno." },
      { status: 500 }
    );
  }
}
