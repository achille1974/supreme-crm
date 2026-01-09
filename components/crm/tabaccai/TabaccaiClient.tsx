"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TabaccaiList from "./TabaccaiList";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TabaccaiClient() {
  const [tabaccai, setTabaccai] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("tabaccai_master")
      .select("*")
      .order("comune", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Supabase error:", error);
          setTabaccai([]);
        } else {
          setTabaccai(data ?? []);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Caricamento…</div>;
  }

  return <TabaccaiList tabaccai={tabaccai} />;
}
