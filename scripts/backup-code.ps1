Write-Host "Backup codice CRM in corso..."

# Percorsi
$source  = "C:\Users\achil\crm-tabaccai"
$temp    = "$env:TEMP\crm_backup_temp"
$destDir = "C:\Users\achil\OneDrive\CRM-Backups\code"

# Pulizia cartella temporanea
if (Test-Path $temp) {
    Remove-Item $temp -Recurse -Force
}
New-Item -ItemType Directory -Path $temp | Out-Null

# Crea cartella destinazione se non esiste
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

# Copia codice ESCLUDENDO cartelle inutili
robocopy `
    $source `
    $temp `
    /E `
    /XD ".next" "node_modules" ".git" "backups" `
    > $null

# Crea ZIP
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$zipPath = Join-Path $destDir "crm-code-$timestamp.zip"

Compress-Archive `
    -Path "$temp\*" `
    -DestinationPath $zipPath `
    -Force

# Pulizia finale
Remove-Item $temp -Recurse -Force

Write-Host "BACKUP CODICE COMPLETATO"
Write-Host "File creato:"
Write-Host $zipPath
