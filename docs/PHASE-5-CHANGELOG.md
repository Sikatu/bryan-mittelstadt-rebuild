# Phase 5 Changelog — Asset System and Visual Refinement

Date: July 29, 2026

## Delivered

- Replaced every public source reference to the legacy SVG placeholder directory with typed asset records.
- Removed the legacy placeholder image files from `public/images/placeholders/`.
- Added a centralized image registry for the hero, portrait, reel poster, nine project images, and four discipline images.
- Added explicit asset availability, alternative text, editorial label, tone, and focal-position controls.
- Added `EditorialImage`, which renders approved photography through `next/image` and renders an honest, non-photographic editorial state while an asset remains pending.
- Updated homepage, project, discipline, About, Music, creative-project, and reel-poster presentation to use the centralized asset system.
- Added a generated 1200 × 630 Open Graph and Twitter card so social shares have a stable launch-safe visual before photography is approved.
- Updated structured data to use only a real configured reel-poster source.
- Separated missing technical assets from client-supplied launch files in the readiness report.
- Added `npm run audit:assets` to validate image paths, fallback behavior, generated social artwork, and removal of legacy placeholders.
- Refined hero hierarchy, project-card overlays, fallback composition, and discipline-card rhythm for the light editorial design.

## Intentionally Pending

- Bryan's approved homepage hero image.
- Bryan's approved About portrait.
- Approved acting-reel poster.
- Approved project stills and album artwork.
- Approved discipline photography.
- Approved headshots and casting download package.
- Final approved résumé PDF.
- Client approval or replacement of the generated social-sharing card.

## Integrity Rule

A pending image is never represented by stock photography or a fabricated production still. The site displays an explicit editorial state until Bryan supplies and approves the real asset. An image becomes public only after its local path is configured with `approvedAsset(...)` and the validation gate confirms that the file exists.
