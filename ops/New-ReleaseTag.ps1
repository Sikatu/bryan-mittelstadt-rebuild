param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('staging', 'production')]
    [string]$Environment,

    [Parameter(Mandatory = $true)]
    [switch]$ConfirmRelease
)

$ErrorActionPreference = 'Stop'
$ProjectPath = Split-Path -Parent $PSScriptRoot

if (-not $ConfirmRelease) {
    throw 'Release tagging requires -ConfirmRelease.'
}

Set-Location $ProjectPath

$PendingChanges = @(git status --porcelain)
if ($PendingChanges.Count -gt 0) {
    throw 'Release tagging requires a clean working tree.'
}

$Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$Tag = "release/bryan-site-$Environment-$Stamp"
$Commit = (git rev-parse --short HEAD).Trim()

git tag -a $Tag -m "Bryan website $Environment release $Stamp"

Write-Host ''
Write-Host 'RELEASE TAG CREATED' -ForegroundColor Green
Write-Host "Tag: $Tag"
Write-Host "Commit: $Commit"
Write-Host 'Push the tag only after the deployment is verified.' -ForegroundColor Yellow
