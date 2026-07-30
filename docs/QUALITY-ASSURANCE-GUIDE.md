# Quality Assurance Guide

This guide defines the final technical and manual checks for Bryan Mittelstadt's portfolio.

## Authoritative production gate

Run from the project root:

```powershell
npm.cmd run qa
```

That command performs:

1. ESLint.
2. Strict TypeScript validation.
3. Interaction-readiness audit.
4. Content-verification audit.
5. Media architecture audit.
6. Portfolio workflow audit.
7. Asset-system audit.
8. Dependency-integrity audit.
9. SEO, accessibility, and security source audit.
10. Next.js production build.
11. A live `next start` smoke test against the generated production server.

## What the production smoke test verifies

- Every public HTML route returns HTTP 200.
- Every page has one rendered title, one description, one canonical URL, and one `h1`.
- CSP, referrer, content-type, frame, permissions, and HSTS headers are present.
- `X-Powered-By` is absent.
- `robots.txt`, `sitemap.xml`, and `manifest.webmanifest` are available.
- Open Graph and Twitter images render as PNG.
- The custom 404 returns HTTP 404 and includes `noindex`.
- Every public route is represented in the sitemap.

## Manual responsive matrix

Review every public route at these viewport targets:

| Target | Viewport |
|---|---:|
| Small phone | 360 × 800 |
| Standard phone | 390 × 844 |
| Large phone | 430 × 932 |
| Tablet portrait | 768 × 1024 |
| Tablet landscape | 1024 × 768 |
| Laptop | 1366 × 768 |
| Desktop | 1920 × 1080 |
| Ultrawide | 2560 × 1440 |

At every size, verify:

- No horizontal scrolling.
- Header and navigation remain readable.
- Hero content does not overlap controls.
- Section headings are not clipped.
- Cards retain intentional spacing.
- Contact fields fit without zooming.
- Résumé tables remain readable.
- Headshot lightbox stays within the viewport.
- Focus outlines are visible and unobstructed.

## Keyboard and assistive-technology checks

1. Press `Tab` from the top of each page and confirm the skip link appears.
2. Activate the skip link and confirm focus reaches the main content.
3. Open the mobile menu by keyboard, cycle through it, press Escape, and confirm focus returns to the menu button.
4. Verify all buttons and links have understandable names.
5. Test the acting-reel selector with keyboard controls.
6. Test direct audio playback, seeking, and error states.
7. Open the headshot dialog, use left/right arrows, close with Escape, and confirm focus restoration.
8. Submit the contact form with missing and invalid information and confirm errors are announced.
9. Enable reduced motion and confirm large motion is removed.
10. Enable Windows High Contrast or forced-colors mode and confirm focus remains visible.

## Browser matrix

Minimum browser targets for Next.js 16:

- Chrome 111 or newer.
- Edge 111 or newer.
- Firefox 111 or newer.
- Safari 16.4 or newer.

Required manual coverage before launch:

- Latest Chrome on Windows.
- Latest Edge on Windows.
- Latest Firefox on Windows.
- Current Safari on macOS.
- Safari on a current iPhone.
- Chrome on a current Android device.

## Performance review

Run Lighthouse only after approved production imagery and media are configured. Record mobile and desktop results for:

- Performance.
- Accessibility.
- Best Practices.
- SEO.
- Largest Contentful Paint.
- Interaction to Next Paint.
- Cumulative Layout Shift.

Do not optimize against placeholder or absent client assets; final image dimensions and compression materially affect the measurements.

## Dependency safety

Safe commands:

```powershell
npm.cmd ci
npm.cmd audit --omit=dev
npm.cmd outdated
```

Never use this command on the project:

```powershell
npm.cmd audit fix --force
```

Major framework changes must be performed as a dedicated branch with an exact version target, lockfile review, full validation, and rollback coverage.
