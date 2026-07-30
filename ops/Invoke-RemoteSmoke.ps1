param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^https://')]
    [string]$Url,

    [Parameter(Mandatory = $true)]
    [ValidateSet('staging', 'production')]
    [string]$Environment
)

$ErrorActionPreference = 'Stop'
$ProjectPath = Split-Path -Parent $PSScriptRoot

Set-Location $ProjectPath

npm.cmd run qa:remote -- "--environment=$Environment" "--url=$($Url.TrimEnd('/'))"

if ($LASTEXITCODE -ne 0) {
    throw "Remote smoke test failed with exit code $LASTEXITCODE."
}
