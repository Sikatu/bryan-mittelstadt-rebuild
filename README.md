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
npm run check
npm run build
npm run validate
```

`npm run check` runs lint, strict TypeScript validation, the readiness audit, and the Phase 2 source/approval audit. `npm run validate` also creates a production build.

## Documentation

- `docs/REBUILD-ROADMAP.md` — phased execution plan and current delivery status.
- `docs/CLIENT-CONTENT-CHECKLIST.md` — complete client content and media request.
- `docs/CLIENT-APPROVAL-QUEUE.md` — exact decisions and deliveries still required from Bryan.
- `docs/ASSET-REQUIREMENTS.md` — image and document specifications.
- `docs/DESIGN-SYSTEM.md` — current light editorial design system.
- `docs/CONTENT-INVENTORY.md` — source content inventory.
- `docs/CONTENT-VERIFICATION.md` — evidence-ledger architecture and approval policy.
- `src/content/content-verification.json` — machine-readable source and approval ledger.

## Architecture

- `src/app/` — App Router pages, metadata routes, and global layout.
- `src/components/` — reusable UI and interaction components.
- `src/content/` — typed content configuration acting as a lightweight CMS.
- `src/lib/` — metadata and structured-data utilities.
- `src/types/` — shared TypeScript contracts.
- `scripts/` — project audits and validation helpers.
- `public/` — static media, documents, and temporary placeholders.

## Content Integrity Rule

Do not invent credits, links, representation details, media, or availability. Use typed empty values and the `ContentPending` pattern until Bryan provides or approves the material.
