import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
const { pathname } = request.nextUrl;

// ✅ Lascia passare sempre:
// - file statici (_next, immagini, favicon, ecc.)
if (
pathname.startsWith("/_next") ||
pathname.startsWith("/images") ||
pathname.startsWith("/favicon") ||
pathname === "/"
) {
return NextResponse.next();
}

// ✅ Il biglietto digitale DEVE essere pubblico (niente password per i tabaccai)
if (pathname.startsWith("/biglietto-digitale")) {
return NextResponse.next();
}

// ✅ La pagina di login è sempre accessibile
if (pathname === "/login") {
return NextResponse.next();
}

// ✅ Controllo cookie di autenticazione
const cookies = request.cookies;
const hasAuth =
cookies.get("crm_auth_ok")?.value === "1" ||
cookies.get("supreme_crm_auth_ok")?.value === "1";

// Se NON sei loggato → porta al login
if (!hasAuth) {
const loginUrl = new URL("/login", request.url);
loginUrl.searchParams.set("from", pathname);
return NextResponse.redirect(loginUrl);
}

// Se sei loggato → lascia passare
return NextResponse.next();
}

// ✅ Applica il middleware a tutte le pagine tranne gli asset statici
export const config = {
matcher: ["/((?!_next/static|_next/image|favicon.ico|images).*)"],
};