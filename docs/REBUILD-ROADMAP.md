# Bryan Mittelstadt Website Rebuild — Execution Roadmap

Last updated: July 29, 2026

## Current Position

The rebuild has a complete Next.js architecture and all planned routes. The remaining work is concentrated in verified content, real media, functional integrations, final interaction design, and launch QA.

**Estimated readiness after Phase 3 technical completion:**

- Architecture and route coverage: 100%
- Code-quality foundation: 100%
- Core page implementation: approximately 76%
- Verified content architecture: 100%
- Client-approved content and real media: approximately 25%
- Launch readiness: approximately 70%

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

**Status: Blocked by asset delivery**

### Tasks

- Add homepage hero photography.
- Add reel poster, project stills, discipline imagery, album artwork, portrait, and headshots.
- Standardize image crops and focal positions across breakpoints.
- Convert oversized media to WebP or AVIF where appropriate.
- Add responsive sizes and meaningful alternative text.
- Remove all `/images/placeholders/` references from public-facing source.
- Refine spacing, typography, hover behavior, and section rhythm after real media is visible.
- Validate the premium white editorial design on all pages.

### Exit Gate

`npm run audit:readiness` reports zero placeholder references and all required launch assets are present.

---

## Phase 6 — SEO, Accessibility, Performance, and Browser QA

**Status: Not started**

### Tasks

- Add the final 1200 × 630 Open Graph image.
- Validate page metadata, canonicals, sitemap, robots directives, and JSON-LD.
- Add project-specific metadata where useful.
- Run automated and manual accessibility testing.
- Verify heading hierarchy, landmark structure, labels, contrast, focus order, reduced motion, and screen-reader output.
- Run Lighthouse on mobile and desktop.
- Optimize JavaScript, images, fonts, and loading behavior.
- Test Chrome, Edge, Firefox, Safari, iOS, Android, tablets, and common desktop widths.
- Verify every route, link, download, email action, embedded player, and form state.

### Exit Gate

No critical accessibility or functional issues, no broken links, and agreed performance thresholds are met.

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

1. Collect and approve the open Phase 2 and Phase 3 client media package.
2. Complete résumé, headshots, about, and contact workflows in Phase 4.
3. Integrate real photography and approved media in Phase 5.
4. Run SEO, accessibility, performance, and browser QA.
5. Obtain final approval and deploy.
