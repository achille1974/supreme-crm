import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const OUT_DIR = path.resolve("backups/storage");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌ Mancano SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function walkBucket(bucket, prefix = "") {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(prefix, { limit: 1000 });

  if (error) throw error;
  if (!data) return;

  for (const item of data) {
    const itemPath = prefix ? `${prefix}/${item.name}` : item.name;

    if (item.metadata === null) {
      // è una cartella → ricorsione
      await walkBucket(bucket, itemPath);
    } else {
      // è un file → download
      const localPath = path.join(OUT_DIR, bucket, itemPath);
      ensureDir(path.dirname(localPath));

      const { data: file, error: dlError } =
        await supabase.storage.from(bucket).download(itemPath);

      if (dlError) throw dlError;

      fs.writeFileSync(localPath, Buffer.from(await file.arrayBuffer()));
      console.log(`⬇️ ${bucket}/${itemPath}`);
    }
  }
}

async function main() {
  ensureDir(OUT_DIR);

  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;

  for (const bucket of buckets) {
    console.log(`📦 Bucket: ${bucket.name}`);
    await walkBucket(bucket.name);
  }

  console.log("✅ Backup Storage completato");
}

main().catch((err) => {
  console.error("❌ Errore backup storage:", err.message || err);
  process.exit(1);
});
