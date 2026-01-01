# scripts/backup-zip.ps1
$ErrorActionPreference = "Stop"

# Root del progetto (cartella sopra /scripts)
$root = Resolve-Path (Join-Path $PSScriptRoot "..")

$ts = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$zipDir = Join-Path $root "backups\zip"
New-Item -ItemType Directory -Force -Path $zipDir | Out-Null

$src = @(
  Join-Path $root "backups\db"
  Join-Path $root "backups\storage"
)

$zipPath = Join-Path $zipDir "crm-backup-$ts.zip"

Compress-Archive -Path $src -DestinationPath $zipPath -Force

Write-Host "OK ZIP -> $zipPath"
