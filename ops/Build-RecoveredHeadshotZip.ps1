$ErrorActionPreference = "Stop"

$ProjectPath = Split-Path -Parent $PSScriptRoot
$OutputDirectory = Join-Path $ProjectPath "public\downloads"
$OutputPath = Join-Path $OutputDirectory "bryan-mittelstadt-current-site-headshots.zip"

$Files = @(
    "public\images\bryan\current-site\featured\home-dsc-1685.jpeg",
    "public\images\bryan\current-site\print\print-01-dsc-1960.jpeg",
    "public\images\bryan\current-site\print\print-02.jpeg",
    "public\images\bryan\current-site\print\print-03.jpeg",
    "public\images\bryan\current-site\print\print-04.jpeg",
    "public\images\bryan\current-site\print\print-05.jpeg",
    "public\images\bryan\current-site\print\print-06.jpeg",
    "public\images\bryan\current-site\print\print-07.jpeg"
)

$ResolvedFiles = foreach ($RelativePath in $Files) {
    $FullPath = Join-Path $ProjectPath $RelativePath
    if (-not (Test-Path -LiteralPath $FullPath)) {
        throw "Recovered headshot is missing: $RelativePath"
    }
    $FullPath
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

if (Test-Path -LiteralPath $OutputPath) {
    Remove-Item -LiteralPath $OutputPath -Force
}

Compress-Archive `
    -LiteralPath $ResolvedFiles `
    -DestinationPath $OutputPath `
    -CompressionLevel Optimal

$Zip = Get-Item -LiteralPath $OutputPath
if ($Zip.Length -lt 20000) {
    throw "Recovered headshot ZIP is unexpectedly small: $($Zip.Length) bytes"
}

Write-Host "Recovered headshot ZIP created:" -ForegroundColor Green
Write-Host $OutputPath
