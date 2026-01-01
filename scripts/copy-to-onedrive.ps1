# scripts/copy-to-onedrive.ps1
$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$src = Join-Path $root "backups\zip"
$dest = Join-Path $env:USERPROFILE "OneDrive\CRM-Backups"

New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item "$src\*.zip" $dest -Force

Write-Host "OK OneDrive -> $dest"
