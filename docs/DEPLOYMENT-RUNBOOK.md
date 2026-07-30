# Deployment Runbook

## Purpose

This project supports Vercel, a managed Node.js host, or another Next.js-compatible provider. Phase 7 does not assume which provider will be selected.

## 1. Select the Provider

Update `deployment.config.json`:

```json
"provider": "vercel"
```

Allowed values are `vercel`, `node`, and `other`.

For staging, also set a real HTTPS `stagingOrigin`, or pass `NEXT_PUBLIC_SITE_URL` through the environment.

## 2. Configure Environment Variables

Copy `.env.example` into the provider's environment-variable system. Do not commit `.env` files.

Required for staging:

- `NEXT_PUBLIC_SITE_ENV=staging`
- `NEXT_PUBLIC_SITE_URL=https://your-staging-domain`
- `DEPLOYMENT_PROVIDER=<selected provider>`

Required for production:

- `NEXT_PUBLIC_SITE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://www.bryanmittelstadt.com`
- `DEPLOYMENT_PROVIDER=<selected provider>`

Optional:

- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=<approved HTTPS endpoint>`
- `REMOTE_SMOKE_URL=<deployed origin>`

## 3. Prepare Staging

```powershell
.\ops\Prepare-Staging.ps1 `
  -SiteUrl "https://staging.example.com" `
  -Provider vercel
```

This runs strict environment validation, all automated QA, the production build, the local production smoke test, and creates a release manifest. It does not deploy.

## 4. Deploy Through the Selected Provider

Use the provider's normal Git integration or deployment command. Deploy the exact commit recorded in `.release/<environment>-<timestamp>/release-manifest.json`.

Do not deploy from an uncommitted working tree.

## 5. Verify Staging

```powershell
.\ops\Invoke-RemoteSmoke.ps1 `
  -Url "https://staging.example.com" `
  -Environment staging
```

Confirm that staging pages carry `noindex` and that `robots.txt` blocks crawling.

Complete `docs/CLIENT-REVIEW-CHECKLIST.md` with Bryan.

## 6. Prepare Production

Production preparation intentionally fails until all launch blockers and approval items are resolved.

```powershell
.\ops\Prepare-Production.ps1 `
  -Provider vercel `
  -ConfirmProduction
```

## 7. Production Cutover

Follow `docs/DNS-CUTOVER-CHECKLIST.md`. Preserve the old website and DNS records before changing traffic.

## 8. Verify Production

```powershell
.\ops\Invoke-RemoteSmoke.ps1 `
  -Url "https://www.bryanmittelstadt.com" `
  -Environment production
```

Then verify forms, downloads, media, social cards, analytics, mobile rendering, and external links manually.

## 9. Tag the Verified Release

```powershell
.\ops\New-ReleaseTag.ps1 `
  -Environment production `
  -ConfirmRelease
```

Push the release tag only after remote QA passes.
