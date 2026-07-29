# Bryan Client Approval Queue

Last updated: July 29, 2026

This is the exact Phase 2 decision queue. Each answer should be recorded in `src/content/content-verification.json` and then applied to the typed content files.

## Highest Priority — Public Copy Already Visible

1. **Biography**
   - Approve the short homepage biography.
   - Approve the full biography.
   - Confirm whether *The Overview Effect* language is still current.
   - Confirm which festival names should remain in the biography.

2. **Casting details**
   - Confirm height, weight, hair color, eye color, and vocal range.
   - Confirm SAG-AFTRA and Actors' Equity status and preferred formatting.

3. **Projects**
   - Confirm the current status, format, collaborators, venue wording, and dates for *The Overview Effect*.
   - Confirm the exact relationship between *Arabesque* and *Blood and Sex Over Ambition*.
   - Confirm the role, director, and festival claims for *Give*.
   - Confirm the production credit for *The Last Five Years*.
   - Confirm *Darling* title, release timing, description, and artwork.

4. **Résumé**
   - Supply the final résumé PDF.
   - Approve the selected HTML credits.
   - Confirm training, institutions, teachers, and special skills.

5. **Homepage positioning**
   - Approve the Acting, Voice-Over, Music, and Writing & Filmmaking descriptions.
   - Approve the global SEO title and description.

## Launch-Critical Deliveries

- Primary acting reel URL.
- Final résumé PDF.
- Approved hero image.
- Approved portrait.
- Project stills or posters.
- Theatrical and commercial headshots.
- 1200 × 630 Open Graph image or an approved source photograph.
- Voice-over reel audio or hosting links.
- Mailing-list provider and signup destination.

## Representation and Contact

- Confirm whether CESD and Eris remain current.
- Confirm whether agent names, direct email addresses, phone numbers, and agency websites may be public.
- Confirm whether theatrical representation exists and should be displayed.
- Decide whether the site should use direct email, a contact form, or both.

## Social Profiles

- Instagram canonical URL.
- YouTube canonical channel URL.
- Confirm the IMDb URL already identified in Phase 2.

## Writing & Filmmaking

For every approved project, supply:

- Title
- Role
- Format
- Status
- Year
- Logline or summary
- Image or poster
- Public link
- Rights confirmation

## Approval Recording

For each completed item:

1. Update its manifest status to `client-approved`.
2. Add `client-approval` to its `sourceIds`.
3. Remove or revise the `ownerAction`.
4. Apply the approved content in the relevant typed content file.
5. Run `npm run check`.
