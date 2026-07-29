Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " SYNCROZZ Publish Engine v3.0" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$root = $PSScriptRoot
$sourceRoot = Join-Path $root "03 Source"
$targetRoot = Join-Path $root "docs"

# -----------------------------------------
# Validate
# -----------------------------------------

if (!(Test-Path $sourceRoot)) {
    Write-Host "ERROR: Source folder not found." -ForegroundColor Red
    exit 1
}

# -----------------------------------------
# Ensure docs exists
# -----------------------------------------

if (!(Test-Path $targetRoot)) {
    New-Item -ItemType Directory -Path $targetRoot | Out-Null
}

# -----------------------------------------
# Clean docs (Preserve CNAME)
# -----------------------------------------

Write-Host "Cleaning docs..." -ForegroundColor Yellow

Get-ChildItem $targetRoot -Force |
Where-Object {
    $_.Name -notin @(
        ".git",
        ".gitkeep",
        "CNAME"
    )
} |
Remove-Item -Recurse -Force

# -----------------------------------------
# Publish Landing
# -----------------------------------------

$landing = Join-Path $sourceRoot "Landing"

if (Test-Path $landing) {

    Write-Host ""
    Write-Host "Publishing Landing..." -ForegroundColor Cyan

    Copy-Item "$landing\*" $targetRoot -Recurse -Force
}

# -----------------------------------------
# Publish Applications
# -----------------------------------------

$appRoot = Join-Path $sourceRoot "Apps"

if (Test-Path $appRoot) {

    Get-ChildItem $appRoot -Directory |

    ForEach-Object {

        $appName = $_.Name.ToLower()
        $destination = Join-Path $targetRoot $appName

        New-Item -ItemType Directory -Path $destination -Force | Out-Null

        Write-Host ""
        Write-Host "Publishing $($_.Name)..." -ForegroundColor Cyan

        Copy-Item "$($_.FullName)\*" $destination -Recurse -Force

    }

}

# -----------------------------------------
# Summary
# -----------------------------------------

$files = (Get-ChildItem $targetRoot -Recurse -File).Count

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host " Publish Completed Successfully"
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Output : $targetRoot"
Write-Host "Files  : $files"
Write-Host ""