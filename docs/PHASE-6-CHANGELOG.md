# Phase 6 Changelog — Quality, Accessibility, SEO, and Security Hardening

Date: July 29, 2026

## Baseline

- Starting branch: `phase/phase-5-asset-system`
- Starting commit: `9b3e53235df5d1b8ddeb610d3ff155af1ee0846b`
- Framework baseline: Next.js 16.2.11, React 19.2.4

## Delivered

### Production security

- Disabled the `X-Powered-By` response header.
- Added production-only Content Security Policy protection.
- Added frame-embedding protection, MIME sniffing protection, a strict referrer policy, a permissions policy, and HSTS.
- Kept the CSP disabled during `next dev` so Turbopack development behavior is not broken.
- Added a dependency-integrity gate that rejects accidental framework downgrades, Next/ESLint-config mismatches, React mismatches, and package-lock drift.
- Declared Node.js `>=20.9.0`, matching the Next.js 16 runtime requirement.

### SEO and metadata

- Corrected the homepage title so the site name is not appended twice.
- Added a typed web manifest.
- Added a stable content-update date for sitemap entries instead of claiming every route changed at build time.
- Preserved canonical URLs, page descriptions, Open Graph metadata, Twitter metadata, robots directives, sitemap output, and JSON-LD.
- Added an accessible, noindex custom 404 page.

### Accessibility

- Removed the nested `<main>` landmark from the About page.
- Corrected the homepage biography section heading from `h3` to `h2`.
- Made the skip-link destination programmatically focusable.
- Restored focus to the mobile-menu opener after the dialog closes.
- Hid the closed mobile navigation from assistive technology.
- Connected inquiry-form help text with `aria-describedby`.
- Added forced-colors focus support while retaining reduced-motion behavior.

### Social image compatibility

- Removed unsupported `zIndex` styling from the generated Open Graph image.
- Kept the generated 1200 × 630 Open Graph and Twitter images as launch-safe editorial artwork.

### Automated QA

- Added `npm run audit:dependencies`.
- Added `npm run audit:quality`.
- Added `npm run qa:smoke` for post-build route, metadata, security-header, social-image, sitemap, robots, and 404 testing.
- Added `npm run qa` as the complete production gate: lint, TypeScript, all repository audits, build, and live production smoke testing.
- Added a cross-browser and responsive manual QA matrix.

## Remaining launch work

The technical Phase 6 foundation is complete. These items remain outside the source-only implementation:

- Run the Windows production build and smoke test through the supplied installer.
- Run manual visual checks in Chrome, Edge, Firefox, and Safari.
- Run mobile checks on iOS Safari and Android Chrome.
- Record Lighthouse results after real approved photography and media are installed.
- Review the production npm audit report without using `npm audit fix --force`.
- Supply and approve the résumé PDF, photography, headshots, reels, voice-over audio, project data, and final integrations.
