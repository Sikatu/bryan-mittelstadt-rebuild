param(
    [Parameter(Mandatory = $true)]
    [string]$TargetCommit,

    [Parameter(Mandatory = $true)]
    [switch]$ConfirmRollback
)

$ErrorActionPreference = 'Stop'
$ProjectPath = Split-Path -Parent $PSScriptRoot

if (-not $ConfirmRollback) {
    throw 'Rollback preparation requires -ConfirmRollback.'
}

Set-Location $ProjectPath

$PendingChanges = @(git status --porcelain)
if ($PendingChanges.Count -gt 0) {
    throw 'Rollback preparation requires a clean working tree.'
}

git cat-file -e "$TargetCommit^{commit}" 2>$null
if ($LASTEXITCODE -ne 0) {
    throw "Unknown rollback commit: $TargetCommit"
}

$Stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$CurrentCommit = (git rev-parse HEAD).Trim()
$SafetyTag = "rollback-safety/$Stamp"
$RollbackBranch = "rollback/$Stamp"

git tag -a $SafetyTag $CurrentCommit -m "Safety point before rollback $Stamp"
git switch -c $RollbackBranch $TargetCommit

npm.cmd ci
if ($LASTEXITCODE -ne 0) {
    throw 'npm ci failed on the rollback branch.'
}

npm.cmd run qa
if ($LASTEXITCODE -ne 0) {
    throw 'Rollback branch QA failed. Do not redeploy it.'
}

Write-Host ''
Write-Host 'ROLLBACK BRANCH PREPARED' -ForegroundColor Green
Write-Host "Branch: $RollbackBranch"
Write-Host "Safety tag: $SafetyTag"
Write-Host 'No production deployment was changed.' -ForegroundColor Yellow
