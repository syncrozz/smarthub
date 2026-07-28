# ==========================================================
# SYNCROZZ Deploy Script v1.0
# SmartHub Deployment
# ==========================================================

Clear-Host

Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "      SYNCROZZ SMART HUB DEPLOY v1.0"
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

$source = ".\03 Source\Frontend"
$target = ".\docs"

Write-Host "Source : $source"
Write-Host "Target : $target"
Write-Host ""

$confirm = Read-Host "Continue deployment? (Y/N)"

if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host ""
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "[1/5] Cleaning docs..." -ForegroundColor Yellow

if (Test-Path $target) {
    Remove-Item "$target\*" -Recurse -Force
}
else {
    New-Item -ItemType Directory -Path $target | Out-Null
}

Write-Host "[2/5] Copying Frontend -> docs..." -ForegroundColor Yellow

Copy-Item "$source\*" $target -Recurse -Force

Write-Host "[3/5] Git Add..." -ForegroundColor Yellow
git add .

$time = Get-Date -Format "yyyy-MM-dd HH:mm"

Write-Host "[4/5] Git Commit..." -ForegroundColor Yellow
git commit -m "Deploy SmartHub - $time"

Write-Host "[5/5] Git Push..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "==============================================" -ForegroundColor Green
Write-Host "      DEPLOY COMPLETED SUCCESSFULLY"
Write-Host "==============================================" -ForegroundColor Green
Write-Host ""