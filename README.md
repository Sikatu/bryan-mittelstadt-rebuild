# Bryan Mittelstadt — Official Website Rebuild

A premium editorial portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS v4.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run typecheck
npm run audit:readiness
npm run audit:content
npm run audit:media
npm run audit:workflows
npm run audit:assets
npm run audit:dependencies
npm run audit:quality
npm run check
npm run build
npm run qa:smoke
npm run qa
```

`npm run check` runs lint, strict TypeScript validation, all Phase 1–6 source audits, dependency-integrity checks, and quality hardening checks. `npm run qa` also creates a production build and starts the production server for live route, metadata, security-header, social-image, sitemap, robots, and 404 smoke testing.

## Documentation

- `docs/REBUILD-ROADMAP.md` — phased execution plan and current delivery status.
- `docs/CLIENT-CONTENT-CHECKLIST.md` — complete client content and media request.
- `docs/CLIENT-APPROVAL-QUEUE.md` — exact decisions and deliveries still required from Bryan.
- `docs/ASSET-REQUIREMENTS.md` — image and document specifications.
- `docs/ASSET-INTEGRATION-GUIDE.md` — exact image activation, crop, focal-position, and social-card workflow.
- `docs/DESIGN-SYSTEM.md` — current light editorial design system.
- `docs/CONTENT-INVENTORY.md` — source content inventory.
- `docs/CONTENT-VERIFICATION.md` — evidence-ledger architecture and approval policy.
- `docs/MEDIA-INTEGRATION-GUIDE.md` — exact instructions for adding approved reels, audio, music links, and creative projects.
- `docs/PORTFOLIO-WORKFLOW-GUIDE.md` — résumé, headshot, contact-form, and representation integration instructions.
- `docs/PHASE-3-CHANGELOG.md` — delivered media architecture and remaining client dependencies.
- `docs/PHASE-4-CHANGELOG.md` — delivered portfolio workflows and remaining production dependencies.
- `docs/PHASE-5-CHANGELOG.md` — delivered asset architecture and remaining client media dependencies.
- `docs/PHASE-6-CHANGELOG.md` — delivered quality, SEO, accessibility, and security hardening.
- `docs/QUALITY-ASSURANCE-GUIDE.md` — automated and manual production QA matrix.
- `docs/SECURITY-DEPENDENCY-REVIEW.md` — security headers, dependency policy, and controlled-upgrade procedure.
- `src/content/content-verification.json` — machine-readable source and approval ledger.

## Architecture

- `src/app/` — App Router pages, metadata routes, and global layout.
- `src/components/` — reusable UI and interaction components.
- `src/content/` — typed content configuration acting as a lightweight CMS.
- `src/lib/` — metadata and structured-data utilities.
- `src/types/` — shared TypeScript contracts.
- `scripts/` — project audits and validation helpers.
- `public/` — approved static media and downloadable documents.

## Content Integrity Rule

Do not invent credits, links, representation details, media, or availability. Use typed pending values, `EditorialImage`, and the `ContentPending` pattern until Bryan provides or approves the material.


## Dependency Safety

Use exact, reviewed dependency updates. Never run `npm audit fix --force`; the dependency-integrity audit intentionally rejects accidental framework downgrades and lockfile drift.
