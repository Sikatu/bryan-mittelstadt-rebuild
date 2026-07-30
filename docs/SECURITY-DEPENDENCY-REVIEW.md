# Security and Dependency Review

Date: July 29, 2026

## Locked framework baseline

- Next.js: 16.2.11
- React: 19.2.4
- React DOM: 19.2.4
- ESLint Config Next: 16.2.11
- Minimum Node.js: 20.9.0

The Phase 6 dependency audit ensures that Next.js remains on the supported 16.2 security line, React and React DOM match, `eslint-config-next` matches Next.js, and `package-lock.json` agrees with `package.json`.

## Response hardening

Production responses configure:

- Content Security Policy.
- `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- Restricted camera, microphone, location, payment, and USB permissions.
- HSTS for HTTPS deployments.
- No `X-Powered-By` disclosure.

The CSP permits the currently designed media providers: local assets, HTTPS images and audio, YouTube, YouTube Privacy Enhanced Mode, and Vimeo. When a contact provider, analytics provider, or additional embed provider is approved, its exact origin must be added deliberately rather than weakening the policy globally.

## npm audit policy

`npm audit` findings must be reviewed from the clean committed dependency tree. Automated forced remediation is prohibited because it can replace top-level framework packages with incompatible major versions.

Use:

```powershell
npm.cmd audit --omit=dev
```

Capture the full output and assess:

1. Whether the vulnerable package exists in production dependencies.
2. Whether the affected code path is used by this static portfolio.
3. Whether a patch release exists on the current supported framework line.
4. Whether the exact upgrade passes all audits, build checks, and production smoke tests.

## Controlled upgrades

A framework update must:

1. Begin from a clean Git branch.
2. Use an exact target version.
3. Update Next.js and `eslint-config-next` together.
4. Preserve matching React and React DOM versions.
5. Review `package-lock.json` before commit.
6. Run `npm run qa`.
7. Keep a verified rollback commit and project backup.
