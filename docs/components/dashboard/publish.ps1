Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " SYNCROZZ Publish Script" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$source = "03 Source\Frontend"
$target = "docs"

# Create docs folder if missing
if (!(Test-Path $target)) {
    New-Item -ItemType Directory -Path $target | Out-Null
}

Write-Host "Cleaning docs folder..."
Get-ChildItem $target -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force

Write-Host "Copying frontend..."
Copy-Item "$source\*" $target -Recurse -Force

Write-Host ""
Write-Host "Publish folder updated successfully." -ForegroundColor Green
Write-Host ""