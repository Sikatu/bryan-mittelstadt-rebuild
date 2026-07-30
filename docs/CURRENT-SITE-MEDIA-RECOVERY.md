# Current-Site Media Recovery Guide

Captured: July 30, 2026

## Scope

Phase 8 migrates media already displayed publicly on Bryan Mittelstadt's current Wix website into the rebuild. It does not deploy the site and does not claim final client approval.

The recovery manifest is `src/content/current-site-media.json`. It records each source page, Wix source URL, local destination, intended use, and rights-review status.

## Recovered automatically

- 31 images from the public Print gallery
- Current homepage headshot and cinematic stills
- Public Bio lifestyle portrait
- Current `Darling` artwork
- Current résumé-page image
- Current contact portrait
- Five public acting, commercial, identity-led, vocal/guitar, and classical-voice reels
- Public Instagram and YouTube profile URLs

## Used in the rebuild now

- Homepage hero
- About portrait
- Acting reel poster
- Acting discipline image
- Voice-over discipline portrait
- Music discipline artwork
- Writing and filmmaking discipline image
- `Darling` project artwork
- Eight-image headshot gallery
- Casting headshot ZIP
- Five public reel entries

## Still missing

- Voice-over audio files or stable direct audio URLs
- Final downloadable résumé PDF
- Project-specific production stills not publicly displayed
- Photographer credits
- Explicit permission to offer original headshots as public downloads
- Final approval of crops, labels, gallery order, and reel selection

## Repeatable commands

```powershell
npm.cmd run media:recover
powershell -ExecutionPolicy Bypass -File .\ops\Build-RecoveredHeadshotZip.ps1
npm.cmd run media:verify
npm.cmd run audit:current-site-media
```

Use `npm.cmd run media:recover -- --force` only when intentionally refreshing files from the public site.

## Rights and quality note

Public display on the current website supports migration for review, but it does not establish photographer-credit requirements or unrestricted download rights. The recovered files remain marked `client-review-required` until Bryan or an authorized representative confirms final use.
