# Asset Requirements

The Phase 5 codebase does not hotlink media from the legacy Wix site and does not publish stock or fabricated substitutes. All client photography remains pending until Bryan supplies the original files and confirms publication rights.

The current UI uses an explicit non-photographic editorial state for missing images. Central configuration lives in `src/content/assets.ts`; implementation instructions live in `docs/ASSET-INTEGRATION-GUIDE.md`.

## Required Client Deliverables

### 1. Homepage Hero Photography

- Purpose: primary homepage visual
- Preferred source: at least 2400 × 1600
- Format: WebP, AVIF, or high-quality JPEG
- Target directory: `public/images/bryan/hero/`
- Approval needed: crop, focal point, retouching, attribution, and publication permission

### 2. Acting Reel Poster

- Purpose: poster before reel playback
- Preferred source: 1920 × 1080
- Target directory: `public/images/bryan/reels/`
- Approval needed: title treatment and any award or production marks

### 3. Current Work Images

- Purpose: large homepage editorial features
- Preferred source: at least 1600 × 1200
- Target directory: `public/images/bryan/projects/`
- Required for: The Overview Effect, Quiet After Supper, and Darling

### 4. Selected Work Images

- Purpose: homepage portfolio grid
- Preferred source: at least 1200 × 1600
- Target directory: `public/images/bryan/projects/`
- Required for: Julius, Blood and Sex Over Ambition, Goldilocks and the Two Bears, Give, The Last Five Years, and Arabesque

### 5. Discipline Images

- Purpose: Acting, Voice-Over, Music, and Writing & Filmmaking navigation cards
- Preferred source: at least 1200 × 1600 or 1600 × 1200
- Target directory: `public/images/bryan/disciplines/`

### 6. About Portrait

- Purpose: About page portrait
- Preferred source: at least 1800 × 2400
- Target directory: `public/images/bryan/portraits/`

### 7. Headshots and Casting Package

- Display versions: optimized WebP
- Download originals: high-resolution JPEG
- Optional ZIP: `public/downloads/`
- Required metadata: label, category, preferred order, meaningful alt text, and download permission

### 8. Résumé PDF

- Purpose: casting download
- Target path: `public/bryan-mittelstadt-resume.pdf`
- Must be reconciled with the HTML résumé before activation

### 9. Social-Sharing Artwork

A generated branded card is already available at `/opengraph-image` and `/twitter-image`. Bryan may approve it for launch or supply approved photography for a replacement.
