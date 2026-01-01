import { Suspense } from "react";
import BigliettoClient from "./BigliettoClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Caricamento biglietto…</div>}>
      <BigliettoClient />
    </Suspense>
  );
}
