# ==========================================
# SYNCROZZ Deploy Script
# Source -> Production
# ==========================================

$source = ".\03 Source\Frontend"
$target = ".\docs\smarthub"

Write-Host ""
Write-Host "====================================="
Write-Host "SYNCROZZ SmartHub Deploy"
Write-Host "====================================="
Write-Host ""

# Remove old production
if (Test-Path $target) {
    Remove-Item $target -Recurse -Force
}

# Recreate production folder
New-Item -ItemType Directory -Path $target | Out-Null

# Copy everything
Copy-Item "$source\*" $target -Recurse -Force

Write-Host ""
Write-Host "Deploy completed successfully."
Write-Host ""
Write-Host "Source : $source"
Write-Host "Target : $target"
Write-Host ""