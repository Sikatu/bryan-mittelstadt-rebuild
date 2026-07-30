# Rollback Runbook

## When to Roll Back

Rollback is appropriate for a broken production route, failed forms or downloads, severe rendering regression, incorrect public content, security-header failure, or deployment outage caused by the new release.

## Immediate Actions

1. Preserve screenshots, logs, deployment identifiers, and the affected URL.
2. Do not rewrite Git history or delete the current release.
3. Identify the last verified production release tag or commit.
4. Create a rollback branch:

```powershell
.\ops\New-RollbackBranch.ps1 `
  -TargetCommit "<verified-commit>" `
  -ConfirmRollback
```

The script creates:

- A safety tag on the currently checked-out commit.
- A new `rollback/<timestamp>` branch at the requested commit.
- A clean dependency installation.
- The complete local QA gate.

It does not change production.

## Redeploy

Deploy the rollback branch or verified release tag through the selected provider. Keep the failed release available for investigation.

## Verify

Run the production remote smoke test and manually test the originally affected feature.

## After Recovery

- Record the incident and root cause.
- Fix forward on a new branch.
- Repeat staging review and production preparation.
- Do not delete the rollback branch or safety tag until the incident is closed.
