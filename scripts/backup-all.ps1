Write-Host "==============================="
Write-Host " BACKUP COMPLETO CRM - START"
Write-Host "==============================="

# Backup codice
Write-Host ""
Write-Host "▶ Backup CODICE"
powershell -ExecutionPolicy Bypass -File backup-code.ps1

# Backup database
Write-Host ""
Write-Host "▶ Backup DATABASE"
powershell -ExecutionPolicy Bypass -File backup-db.ps1

Write-Host ""
Write-Host "==============================="
Write-Host " BACKUP COMPLETO CRM - OK"
Write-Host "==============================="
