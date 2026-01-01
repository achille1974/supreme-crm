# ===============================
# BACKUP DATABASE CRM - TABACCAI
# ===============================

$backupRoot = "C:\Users\achil\OneDrive\CRM-Backups\db"

# ⚠️ INSERISCI QUI I TUOI DATI
$supabaseUrl = "https://rhemerlnszwhrjzicesd.supabase.co"
$serviceKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoZW1lcmxuc3p3aHJqemljZXNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA0ODQ5NywiZXhwIjoyMDgwNjI0NDk3fQ.zrkLfWBhN6L19vXZDmt2rkxHskhMMZdaZjajkugNayo"

# Controllo cartella
if (!(Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot | Out-Null
}

# Nome file
$date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$filePath = Join-Path $backupRoot "tabaccai-$date.csv"

Write-Host "📊 Backup DB in corso..."
Write-Host "File: $filePath"

# Headers Supabase
$headers = @{
    "apikey"        = $serviceKey
    "Authorization" = "Bearer $serviceKey"
}

# Chiamata REST a Supabase
$data = Invoke-RestMethod `
    -Uri "$supabaseUrl/rest/v1/tabaccai?select=*" `
    -Headers $headers `
    -Method GET

# Esporta CSV
$data | Export-Csv -Path $filePath -NoTypeInformation -Encoding UTF8

Write-Host ""
Write-Host "✅ BACKUP DATABASE COMPLETATO"
Write-Host "📁 File creato:"
Write-Host $filePath
