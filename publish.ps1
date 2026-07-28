Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " SYNCROZZ Publish Script v1.1" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$source = Join-Path $PSScriptRoot "03 Source\Frontend"
$target = Join-Path $PSScriptRoot "docs"

# Delete docs completely
if (Test-Path $target) {
    Write-Host "Removing old docs..."
    Remove-Item $target -Recurse -Force
}

# Recreate docs
New-Item -ItemType Directory -Path $target | Out-Null

# Copy Frontend -> docs
Write-Host "Copying frontend..."
Copy-Item "$source\*" $target -Recurse -Force

Write-Host ""
Write-Host "Publish completed successfully." -ForegroundColor Green
Write-Host ""