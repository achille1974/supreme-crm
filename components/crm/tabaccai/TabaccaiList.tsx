"use client";

import TabaccaioRow from "./TabaccaioRow";

export default function TabaccaiList({ tabaccai }: { tabaccai: any[] }) {
  if (!tabaccai.length) {
    return <div className="p-4">Nessun tabaccaio trovato.</div>;
  }

  return (
    <div className="space-y-2">
      {tabaccai.map((t, i) => (
        <div key={t.id ?? i} className="border rounded p-3">
          <TabaccaioRow tabaccaio={t} />
        </div>
      ))}
    </div>
  );
}
