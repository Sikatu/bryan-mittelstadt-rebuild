# Phase 4 Changelog — Portfolio Workflows

Date: July 29, 2026

## Delivered

- Refined the About page with a clear introduction, selected verified recognition, casting-detail disclosure, and stronger portfolio actions.
- Added reusable résumé actions with browser printing and an honest pending state for the client-approved PDF.
- Added print-specific résumé styling for clean letter-size output.
- Added public direct email and confirmed agency names to the HTML résumé while continuing to withhold unapproved representative contacts.
- Added a keyboard-accessible native-dialog headshot lightbox with previous/next controls, arrow-key navigation, focus restoration, and optional original-file downloads.
- Preserved an explicit pending state until Bryan supplies approved headshots and a casting ZIP.
- Added a typed inquiry taxonomy for acting, voice-over, music, writing/filmmaking, press, and general inquiries.
- Added a validated inquiry form with a honeypot field, minimum-message rule, accessible status announcements, optional HTTPS endpoint support, and direct-email fallback.
- Clarified the privacy behavior of the direct-email workflow.
- Upgraded representation cards to reveal agent, email, phone, and website fields only when verified values are configured.
- Added `npm run audit:workflows` to the validation gate.

## Intentionally Pending

- Final biography and casting-detail approval.
- Approved résumé PDF and complete credit reconciliation.
- Approved headshots, original downloads, and casting ZIP.
- Approved representative names and direct contact details.
- Selection of a production contact-form provider, server endpoint, spam policy, and delivery monitoring.

## Integrity Rule

Phase 4 completes the user experience without creating fake assets or integrations. Optional actions remain unavailable or use the verified direct-email path until Bryan supplies and approves their production dependencies.
