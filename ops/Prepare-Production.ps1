param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('vercel', 'node', 'other')]
    [string]$Provider,

    [Parameter(Mandatory = $true)]
    [switch]$ConfirmProduction,

    [ValidatePattern('^$|^https://')]
    [string]$ContactFormEndpoint = ''
)

$ErrorActionPreference = 'Stop'
$ProjectPath = Split-Path -Parent $PSScriptRoot
$ProductionUrl = 'https://www.bryanmittelstadt.com'

if (-not $ConfirmProduction) {
    throw 'Production preparation requires -ConfirmProduction.'
}

Set-Location $ProjectPath

$env:NEXT_PUBLIC_SITE_ENV = 'production'
$env:NEXT_PUBLIC_SITE_URL = $ProductionUrl
$env:DEPLOYMENT_PROVIDER = $Provider
$env:NEXT_PUBLIC_CONTACT_FORM_ENDPOINT = $ContactFormEndpoint

npm.cmd run release:production

if ($LASTEXITCODE -ne 0) {
    throw "Production release preparation failed with exit code $LASTEXITCODE."
}

Write-Host ''
Write-Host 'PRODUCTION RELEASE PACKAGE IS READY' -ForegroundColor Green
Write-Host 'No hosting deployment was executed.' -ForegroundColor Yellow
