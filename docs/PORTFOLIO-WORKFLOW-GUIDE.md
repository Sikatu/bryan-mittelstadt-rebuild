# Portfolio Workflow Integration Guide

## Résumé PDF

1. Place the approved file at `public/bryan-mittelstadt-resume.pdf`.
2. Set `siteConfig.resumeUrl` to `/bryan-mittelstadt-resume.pdf`.
3. Run `npm run check` and test both print and download actions.

## Headshots

Add approved records to `headshots` in `src/content/media.ts`:

```ts
{
  id: 'theatrical-01',
  src: '/images/bryan/headshots/theatrical-01.webp',
  alt: 'Bryan Mittelstadt theatrical headshot',
  label: 'Theatrical 01',
  category: 'Theatrical',
  downloadUrl: '/downloads/bryan-mittelstadt-theatrical-01.jpg',
  verificationId: 'asset.headshots',
}
```

Place the optional casting archive in `public/downloads/` and set `siteConfig.headshotsZipUrl` to its public path.

## Contact Form

The default workflow prepares a message in the visitor's email application. It does not store inquiry data on the website.

To enable direct form delivery:

1. Select and approve a production form provider or first-party API.
2. Confirm privacy, retention, spam protection, delivery monitoring, and fallback requirements.
3. Set the HTTPS URL in `contactFormConfig.endpoint`.
4. Confirm that the endpoint accepts JSON fields: `name`, `email`, `category`, `subject`, and `message`.
5. Test success, validation, provider failure, CORS, rate limiting, and mobile behavior.

Never place private API keys in client-side code.

## Representation

Add only Bryan-approved public fields in `src/content/representation.ts`. Empty agent, email, phone, or website fields remain withheld automatically.
