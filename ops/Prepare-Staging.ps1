param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^https://')]
    [string]$SiteUrl,

    [Parameter(Mandatory = $true)]
    [ValidateSet('vercel', 'node', 'other')]
    [string]$Provider,

    [ValidatePattern('^$|^https://')]
    [string]$ContactFormEndpoint = ''
)

$ErrorActionPreference = 'Stop'
$ProjectPath = Split-Path -Parent $PSScriptRoot

Set-Location $ProjectPath

$env:NEXT_PUBLIC_SITE_ENV = 'staging'
$env:NEXT_PUBLIC_SITE_URL = $SiteUrl.TrimEnd('/')
$env:DEPLOYMENT_PROVIDER = $Provider
$env:NEXT_PUBLIC_CONTACT_FORM_ENDPOINT = $ContactFormEndpoint

npm.cmd run release:staging

if ($LASTEXITCODE -ne 0) {
    throw "Staging release preparation failed with exit code $LASTEXITCODE."
}

Write-Host ''
Write-Host 'STAGING RELEASE PACKAGE IS READY' -ForegroundColor Green
Write-Host 'No hosting deployment was executed.' -ForegroundColor Yellow
