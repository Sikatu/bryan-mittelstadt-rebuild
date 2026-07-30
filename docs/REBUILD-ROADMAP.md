# Bryan Mittelstadt Website Rebuild — Execution Roadmap

Last updated: July 29, 2026

## Current Position

The rebuild has a complete Next.js architecture and all planned routes. The remaining work is concentrated in verified content, real media, functional integrations, final interaction design, and launch QA.

**Estimated readiness after Phase 6 technical hardening:**

- Architecture and route coverage: 100%
- Code-quality foundation: 100%
- Core page implementation: approximately 90%
- Verified content architecture: 100%
- Client-approved content and real media: approximately 25%
- Technical launch readiness: approximately 90%
- Full launch readiness with client-approved content and media: approximately 60%

## Phase 1 — Stabilization and Interaction Integrity

**Status: Completed**

### Goals

- Establish clean lint and strict TypeScript validation.
- Remove obsolete scaffolding and fabricated portfolio content.
- Eliminate dead `#` links and controls that appear functional but are not.
- Create honest, accessible pending states for client-dependent content.
- Add a repeatable readiness audit.

### Delivered

- Removed the obsolete `generate-pages.js` route generator.
- Fixed all ESLint errors and warnings identified in the baseline audit.
- Reworked mobile navigation state so route changes close the overlay without a state-setting effect.
- Removed unsafe `any` usage from Writing & Filmmaking.
- Added `ContentPending` for client-dependent sections.
- Added typed media configuration in `src/content/media.ts`.
- Added disabled and download states to `EditorialButton`.
- Replaced dead résumé, voice-over, music, and headshot actions with accessible pending states.
- Removed invented writing and filmmaking project credits.
- Added `npm run typecheck`, `npm run check`, `npm run validate`, and `npm run audit:readiness`.

### Exit Gate

- `npm run lint` passes.
- `npm run typecheck` passes.
- Readiness audit reports no dead hash links or unsafe `any` usage.

---

## Phase 2 — Content Architecture and Verification

**Status: Technical implementation completed; client approval queue remains open**

### Goals

- Centralize every editable piece of public content.
- Separate confirmed facts from provisional copy.
- Create a complete content intake package for Bryan.
- Make every public claim traceable to a source or explicit client approval.

### Delivered

- ✅ Moved page-local résumé entries into typed content files.
- ✅ Created typed configurations for voice-over reels, music links, writing projects, headshots, and download integrations.
- ✅ Centralized hero, portrait, and reel-poster asset paths.
- ✅ Removed broken Open Graph output until the final image is supplied.
- ✅ Corrected reel structured data so it does not fabricate an upload date.
- ✅ Added `src/content/content-verification.json` as the canonical evidence and approval ledger.
- ✅ Registered first-party, authoritative award, industry-profile, production, internal capture, and client-approval sources.
- ✅ Linked typed content objects to verification record IDs.
- ✅ Added `npm run audit:content` and included it in the project validation gate.
- ✅ Created an exact client approval queue with owner actions.
- ✅ Connected the identified IMDb profile.
- ✅ Corrected the Durango award wording to the festival's published category.
- ✅ Marked every material field as published, withheld, or placeholder and as verified, review-required, approved, pending, or omitted.

### Remaining Client Decisions

- Approve biography, casting details, résumé content, project statuses, and editorial positioning.
- Resolve `Arabesque` versus `Blood and Sex Over Ambition`.
- Supply representation details, social URLs, media, photography, résumé PDF, and integrations.

### Dependency

Bryan's approved résumé, biography, credits, representation details, public links, and launch media.

### Exit Gate

The technical exit gate is complete. The content exit gate closes when every `client-review-required` item is either client-approved, revised, or intentionally omitted.

---

## Phase 3 — Acting, Voice-Over, Music, and Filmmaking Completion

**Status: Technical media architecture completed; approved media delivery remains open**

### Delivered

- ✅ Added six acting reel categories with responsive selector and video states.
- ✅ Added YouTube and Vimeo embed resolution plus external-provider fallback.
- ✅ Rebuilt the homepage reel feature on the centralized media configuration.
- ✅ Added four voice-over categories.
- ✅ Added accessible direct-audio controls with play, pause, seek, timing, and errors.
- ✅ Added hosted-audio fallback actions.
- ✅ Added voice-over representation and inquiry handling without exposing unapproved agent details.
- ✅ Added a music release hub for mailing list, streaming, pre-save, purchase, press, performance links, and samples.
- ✅ Added a typed writing and filmmaking portfolio model for contributions, project types, loglines, statuses, visuals, and public links.
- ✅ Added meaningful inquiry actions to all four discipline pages.
- ✅ Added a media readiness audit to the project validation gate.
- ✅ Removed the legacy single-reel configuration and updated reel structured data.

### Remaining Client Deliveries

- Approved acting reel URLs and optional reel posters.
- Approved voice-over audio files or hosting links.
- Final *Darling* artwork, release date, links, and authorized samples.
- Approved writing, directing, and producing project records.
- Approved imagery and project links.

### Exit Gate

The technical gate is complete. The media-content gate closes when every discipline page contains real, approved media and at least one approved portfolio action beyond direct inquiry.

---

## Phase 4 — About, Résumé, Headshots, and Contact Workflows

**Status: Technical workflow implementation completed; client assets and production form provider remain open**

### Delivered

- ✅ Refined the About page with selected verified recognition and transparent casting-detail review status.
- ✅ Added browser printing and provider-safe PDF download states to the résumé.
- ✅ Added print-friendly letter-size résumé styling.
- ✅ Added direct email and confirmed agency names without exposing unapproved representative contacts.
- ✅ Built a keyboard-accessible headshot lightbox with focus restoration and arrow-key navigation.
- ✅ Added optional individual downloads and casting ZIP integration points.
- ✅ Added six inquiry categories, validation, accessible status output, spam honeypot, and privacy messaging.
- ✅ Added an optional production endpoint with verified direct-email fallback.
- ✅ Added a Phase 4 workflow audit to the validation gate.

### Remaining Client Deliveries

- Final portrait, biography approval, and casting-stat confirmation.
- Approved résumé PDF and reconciled credits.
- Approved headshots, originals, labels, order, and casting ZIP.
- Approved representation contact details.
- Production contact-form provider, privacy policy, spam controls, and monitored delivery endpoint if direct form submission is desired.

### Exit Gate

The technical workflow gate is complete. The conversion-content gate closes when the real PDF, headshots, downloads, approved representation details, and selected contact delivery method are configured and tested.

---

## Phase 5 — Real Asset Integration and Visual Refinement

**Status: Technical asset architecture completed; client photography and final PDF delivery remain open**

### Delivered

- ✅ Removed all public source references to `/images/placeholders/`.
- ✅ Removed legacy placeholder image files from `public/images/placeholders/`.
- ✅ Added centralized typed asset records for hero, portrait, reel poster, project, album, and discipline imagery.
- ✅ Added asset availability, meaningful alternative text, tone, and focal-position controls.
- ✅ Added an honest editorial fallback that never impersonates client photography.
- ✅ Migrated homepage, project cards, discipline cards, About, Music, creative-project, and reel-poster presentation to the centralized system.
- ✅ Added generated 1200 × 630 Open Graph and Twitter artwork.
- ✅ Separated missing technical assets from pending client launch files.
- ✅ Added `npm run audit:assets` to the validation gate.
- ✅ Refined hero hierarchy, image overlays, hover states, and visual rhythm.

### Remaining Client Deliveries

- Approved hero, portrait, reel-poster, project, album, and discipline imagery.
- Approved headshots, downloadable originals, and casting ZIP.
- Final approved résumé PDF.
- Approval or replacement of the generated social card.
- Final crop and focal-position review across breakpoints.

### Exit Gate

The technical asset gate is complete. The client-content gate closes when every required image is approved and configured, the résumé PDF exists, and responsive crop review is complete.

---

## Phase 6 — SEO, Accessibility, Performance, and Browser QA

**Status: Technical hardening and automated QA completed; manual browser and Lighthouse review remain open**

### Delivered

- ✅ Removed unsupported Open Graph `z-index` styling.
- ✅ Corrected homepage title composition and added a web manifest.
- ✅ Added stable sitemap modification dates and a noindex custom 404.
- ✅ Added production security headers and removed framework disclosure.
- ✅ Corrected nested landmarks and heading hierarchy.
- ✅ Improved skip-link, mobile-menu focus restoration, closed-dialog exposure, form descriptions, and forced-colors behavior.
- ✅ Added dependency integrity protection and a Node.js runtime requirement.
- ✅ Added source-level SEO, accessibility, and security auditing.
- ✅ Added live production smoke testing for routes, metadata, headers, social images, sitemap, robots, and 404 behavior.
- ✅ Added a manual responsive, keyboard, assistive-technology, browser, and Lighthouse QA matrix.

### Remaining Manual QA

- Run the authoritative Windows `npm run qa` gate from the installer.
- Test current Chrome, Edge, Firefox, Safari, iOS Safari, and Android Chrome.
- Record Lighthouse mobile and desktop results after approved production imagery and media are installed.
- Review the clean production npm audit report without forced remediation.

### Exit Gate

The automated gate closes when Windows lint, TypeScript, all audits, production build, and production smoke testing pass. The final manual gate closes when browser, mobile, keyboard, assistive-technology, and Lighthouse checks are recorded with no launch-critical issues.

---

## Phase 7 — Client Review, Deployment, and Domain Cutover

**Status: Not started**

### Tasks

- Prepare a protected review deployment.
- Complete Bryan and team review rounds.
- Log requested changes by severity and scope.
- Freeze approved content and create a release candidate.
- Configure production environment variables and integrations.
- Back up the existing website and DNS configuration.
- Deploy production build.
- Configure redirects from legacy URLs.
- Validate SSL, canonical domain, analytics, forms, downloads, and social previews.
- Perform post-deployment smoke testing.

### Exit Gate

Bryan approves the release candidate and all launch checks pass on the production domain.

---

## Phase 8 — Post-Launch Operations

**Status: Not started**

### Tasks

- Monitor errors, form delivery, uptime, Core Web Vitals, and indexing.
- Correct any redirect or metadata issues discovered after crawl.
- Establish a content update workflow for new projects, reels, headshots, and press.
- Document backup, rollback, and deployment procedures.
- Schedule a 30-day post-launch review.

### Exit Gate

The site has a documented owner workflow and no unresolved launch-critical issues.

## Immediate Execution Order

1. Collect and approve the open client content, media, photography, headshot, and résumé package.
2. Activate approved assets through the Phase 5 registry and verify focal positions.
3. Complete the remaining manual browser, device, assistive-technology, and Lighthouse checks from Phase 6.
4. Obtain final client approval and prepare the release candidate.
5. Deploy, validate redirects and integrations, and begin post-launch monitoring.
