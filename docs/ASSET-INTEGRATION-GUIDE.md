# Asset Integration Guide

Phase 5 centralizes public imagery in:

```text
src/content/assets.ts
```

The project no longer uses generic SVG image placeholders. Pending assets render as honest editorial panels through `src/components/EditorialImage.tsx`.

## Approved Image Workflow

1. Confirm Bryan owns or is authorized to publish the image.
2. Optimize the source as WebP, AVIF, or a high-quality JPEG.
3. Save it under the appropriate `public/images/bryan/` directory.
4. Replace the relevant `pendingAsset(...)` call with `approvedAsset(...)`.
5. Set a meaningful alternative text and focal position.
6. Run `npm.cmd run check` and `npm.cmd run build`.
7. Review the crop on mobile, tablet, and desktop.

Example:

```ts
heroImage: approvedAsset(
  'hero-primary',
  'Homepage portrait',
  'Bryan Mittelstadt in a cinematic outdoor portrait',
  '/images/bryan/hero/bryan-hero.webp',
  'dark',
  '58% 32%',
),
```

## Directory Convention

```text
public/images/bryan/hero/
public/images/bryan/portraits/
public/images/bryan/projects/
public/images/bryan/disciplines/
public/images/bryan/reels/
public/images/bryan/headshots/
public/downloads/
```

Do not place approved client media in `src/`, import it from arbitrary desktop paths, or hotlink a legacy Wix CDN URL.

## Recommended Deliverables

### Hero

- Preferred source: at least 2400 × 1600
- Landscape composition with safe negative space near the left side
- WebP or AVIF preferred
- Review at 390 px, 768 px, 1440 px, and 1920 px widths

### About Portrait and Headshots

- Preferred source: at least 1800 × 2400
- Portrait 3:4 crop
- Preserve natural skin tone and avoid aggressive sharpening
- Headshot originals may remain JPEG for casting downloads while display versions use WebP

### Featured Projects

- Preferred source: at least 1600 × 1200
- Editorial 4:3 crop
- Supply project title, credit, photographer or production attribution, and publication permission

### Selected Work and Disciplines

- Preferred source: at least 1200 × 1600
- Portrait 3:4 crop where possible
- Avoid baked-in text unless it is approved key art

### Reel Poster

- 1920 × 1080
- No unsupported award laurels or credits
- Must remain legible beneath the dark player overlay

## Focal Position

`objectPosition` accepts CSS image-position values:

```ts
'50% 50%'  // centered
'62% 28%'  // subject toward the upper-right
'35% 45%'  // subject toward the left
```

Adjust the position in `src/content/assets.ts`; do not hardcode crop rules in page components.

## Social Card

The site currently generates `/opengraph-image` and `/twitter-image` from code. This provides a stable 1200 × 630 branded card without using unapproved photography.

After Bryan approves a photographic social card, either:

- update the metadata route to use that approved image, or
- replace the generated composition while preserving the same dimensions and metadata tests.

## Résumé PDF

Place the final approved document at:

```text
public/bryan-mittelstadt-resume.pdf
```

Then set:

```ts
resumeUrl: '/bryan-mittelstadt-resume.pdf',
```

in `src/content/site.ts`.

## Validation

```powershell
npm.cmd run audit:assets
npm.cmd run check
npm.cmd run build
```

The asset audit fails when:

- a legacy `/images/placeholders/` reference returns,
- the old placeholder directory is restored,
- a configured approved image lives outside `/images/bryan/`,
- a configured approved image file does not exist,
- the generated social-card routes or asset fallback component are removed.
