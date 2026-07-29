Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " SYNCROZZ Publish Script v2.0" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$source = Join-Path $PSScriptRoot "03 Source\Frontend"
$target = Join-Path $PSScriptRoot "docs"

# -----------------------------------------
# Validate Source
# -----------------------------------------

if (!(Test-Path $source)) {
    Write-Host "ERROR: Source folder not found." -ForegroundColor Red
    exit 1
}

# -----------------------------------------
# Ensure Target Exists
# -----------------------------------------

if (!(Test-Path $target)) {
    New-Item -ItemType Directory -Path $target | Out-Null
}

# -----------------------------------------
# Clean docs (Preserve Root Folder)
# -----------------------------------------

Write-Host "Cleaning docs..." -ForegroundColor Yellow

Get-ChildItem $target -Force |
Where-Object {
    $_.Name -notin @(
        ".git",
        ".gitkeep",
        "CNAME"
    )
} |
Remove-Item -Recurse -Force

# -----------------------------------------
# Copy Frontend
# -----------------------------------------

Write-Host "Copying frontend..." -ForegroundColor Cyan

Copy-Item "$source\*" $target -Recurse -Force

# -----------------------------------------
# Verification
# -----------------------------------------

$files = (Get-ChildItem $target -Recurse -File).Count

Write-Host ""
Write-Host "Publish completed successfully." -ForegroundColor Green
Write-Host "Files published : $files"
Write-Host "Source          : $source"
Write-Host "Target          : $target"
Write-Host ""