# Bryan Mittelstadt Website Rebuild — Execution Roadmap

Last updated: July 29, 2026

## Current Position

The rebuild has a complete Next.js architecture and all planned routes. The remaining work is concentrated in verified content, real media, functional integrations, final interaction design, and launch QA.

**Estimated readiness after Phase 1:**

- Architecture and route coverage: 100%
- Code-quality foundation: 100%
- Core page implementation: approximately 65%
- Verified content and real media: approximately 20%
- Launch readiness: approximately 60%

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

**Status: Technical architecture completed; client verification pending**

### Goals

- Centralize every editable piece of public content.
- Separate confirmed facts from provisional copy.
- Create a complete content intake package for Bryan.

### Tasks

- ✅ Move page-local résumé entries into typed content files.
- ✅ Create typed configurations for voice-over reels, music links, writing projects, headshots, and download integrations.
- ✅ Centralize hero, portrait, and reel-poster asset paths.
- ✅ Remove broken Open Graph output until the final image is supplied.
- ✅ Correct reel structured data so it does not fabricate an upload date.
- Reconcile the rebuild against Bryan's approved résumé and current website.
- Verify names, titles, production companies, festivals, awards, dates, representation, and biography claims.
- Resolve inconsistencies such as `Arabesque` versus `Blood and Sex Over Ambition` and confirm how each credit should be represented.
- Finalize page titles, descriptions, calls to action, and navigation labels.
- Mark every field as confirmed, pending, or intentionally omitted.

### Dependency

Bryan's approved résumé, biography, credits, representation details, and public links.

### Exit Gate

Every public statement has an identified source or explicit client approval.

---

## Phase 3 — Acting, Voice-Over, Music, and Filmmaking Completion

**Status: Not started**

### Acting

- Add approved dramatic, comedic, commercial, LGBTQ+, musical, and stage reels where available.
- Add reel categories and responsive video player states.
- Complete project metadata and project detail links.
- Replace every acting placeholder with approved stills or posters.

### Voice-Over

- Connect approved audio files, SoundCloud links, or another hosting provider.
- Build accessible audio controls with duration, play/pause, and loading states where direct audio is available.
- Add commercial, narration, character, and radio-drama categories.
- Add a voice-over inquiry path and verified representation details.

### Music

- Add final *Darling* artwork, approved release copy, and release date.
- Connect mailing-list signup.
- Add streaming, pre-save, purchase, press, and performance links as applicable.
- Add music samples or embedded media after approval.

### Writing & Filmmaking

- Add verified writing, directing, and producing credits.
- Add project types, loglines, roles, status, visuals, and public links.
- Support scripts, excerpts, screening links, or press materials only when authorized.

### Exit Gate

Every discipline page contains real, approved media and at least one meaningful working action.

---

## Phase 4 — About, Résumé, Headshots, and Contact Workflows

**Status: Not started**

### About

- Replace the portrait placeholder.
- Finalize biography and physical details.
- Add selected recognitions without duplicating the résumé.

### Résumé

- Centralize résumé data.
- Reconcile HTML résumé with the approved PDF.
- Add representation and contact details when approved.
- Connect and test the downloadable PDF.
- Add print-friendly styling.

### Headshots

- Add approved theatrical and commercial headshots.
- Build keyboard-accessible lightbox behavior.
- Add individual original-file downloads when approved.
- Create and connect a casting ZIP package.

### Contact

- Decide between direct-email workflow and a proper contact form.
- Add form validation, success/error states, spam protection, and privacy messaging if a form is selected.
- Add inquiry categories such as acting, voice-over, music, press, and general.
- Complete representation cards with verified contact information.

### Exit Gate

All core conversion workflows work on keyboard, touch, and desktop.

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

1. Complete Phase 2 content extraction and verification architecture.
2. Request and organize the client asset/content package.
3. Complete the four discipline pages while assets are being gathered.
4. Complete résumé, headshots, and contact workflows.
5. Integrate real media and perform the final visual pass.
6. Run QA, obtain approval, and deploy.
