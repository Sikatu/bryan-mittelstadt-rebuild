# Media Integration Guide

Phase 3 centralizes all discipline media in:

```text
src/content/media.ts
```

Do not add a public URL or file until Bryan approves it.

## Acting Reels

Find the appropriate item in `actingReels` and change:

```ts
availability: 'pending',
```

to:

```ts
url: 'https://www.youtube.com/watch?v=APPROVED_ID',
availability: 'available',
```

Supported embedded providers:

- YouTube standard, short, embed, and `youtu.be` URLs
- Vimeo standard and player URLs

Other valid URLs open in a new tab instead of being embedded.

Optional fields:

```ts
posterImage: '/images/bryan/reels/dramatic-poster.webp',
year: '2026',
```

## Voice-Over Audio

### Direct audio file

Place an approved MP3, M4A, OGG, or WAV file in `public/audio/voice-over/`, then configure:

```ts
audioUrl: '/audio/voice-over/commercial-reel.mp3',
sourceType: 'direct',
availability: 'available',
```

The site will provide play, pause, seek, elapsed time, duration, and failure states.

### Hosted audio

For SoundCloud or another approved host:

```ts
audioUrl: 'https://approved-host.example/reel',
sourceType: 'external',
availability: 'available',
```

The site will show an external audio action instead of pretending the file can be played locally.

## Music

Add approved release destinations to `musicLinks`:

```ts
{
  label: 'Pre-Save Darling',
  href: 'https://approved-link.example',
  external: true,
  verificationId: 'project.darling',
}
```

Add authorized music samples to `musicSamples` using the same direct or external audio configuration used by voice-over.

Connect the mailing list in `src/content/site.ts` only after the provider and destination are approved:

```ts
mailingListUrl: 'https://approved-signup.example',
```

## Writing & Filmmaking

Add only approved entries to `writingAndFilmmakingProjects`:

```ts
{
  title: 'Approved Project Title',
  discipline: 'Writing & Filmmaking',
  contribution: ['Writer', 'Producer'],
  projectType: 'Short Film',
  logline: 'Approved public logline.',
  status: 'Completed',
  image: '/images/bryan/writing/project.webp',
  link: 'https://approved-public-link.example',
  availability: 'available',
  verificationId: 'media.writing-projects',
}
```

Never publish private scripts, excerpts, screeners, or press material without explicit authorization.

## Validation

After every media update, run:

```powershell
npm.cmd run check
npm.cmd run build
```

The media audit will fail when:

- A configured media item is marked available without a URL.
- A pending media item already exposes a URL.
- A placeholder or `#` URL is used.
- A required category or Phase 3 component is removed.
