import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { voiceOverReels } from '@/content/media';
import { createPageMetadata } from '@/lib/metadata';
import type { AudioReel } from '@/types';

export const metadata = createPageMetadata({
  title: 'Voice-Over',
  description: 'Voice-over reels and commercial narration by Bryan Mittelstadt.',
  path: '/voice-over',
});

function AudioReelCard({ reel }: { reel: AudioReel }) {
  const hasAudio = Boolean(reel.audioUrl);

  return (
    <article className="flex flex-col justify-between gap-6 rounded-sm border border-border-subtle bg-bg-light p-6 sm:flex-row sm:items-center">
      <div>
        <h2 className="mb-1 font-serif text-xl text-text-primary">{reel.title}</h2>
        <p className="text-sm text-text-secondary">{reel.type}</p>
      </div>
      <div className="w-full flex-shrink-0 sm:w-auto">
        {hasAudio ? (
          <a
            href={reel.audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 border border-border-subtle bg-bg-secondary px-6 py-3 text-sm font-medium uppercase tracking-widest text-text-primary transition-colors hover:border-accent hover:text-accent sm:w-auto"
          >
            <PlayIcon />
            Play Audio
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-3 border border-border-subtle bg-bg-secondary px-6 py-3 text-sm font-medium uppercase tracking-widest text-text-muted opacity-60 sm:w-auto"
          >
            <PlayIcon />
            Audio Pending
          </button>
        )}
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
  );
}

export default function VoiceOverPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container narrow>
        <SectionHeading as="h1" eyebrow="Voice-Over">
          Audio Reels
        </SectionHeading>

        <div className="mt-8 mb-16 max-w-2xl">
          <p className="body-text text-text-secondary">
            Commercial, dramatic narration, and character acting for radio drama and animation.
          </p>
        </div>

        <div className="space-y-6">
          {voiceOverReels.map((reel) => (
            <AudioReelCard key={reel.title} reel={reel} />
          ))}
        </div>

        {!voiceOverReels.some((reel) => reel.audioUrl) && (
          <p className="mt-6 text-sm text-text-muted">
            Playback will be enabled after Bryan supplies the approved audio or hosting links.
          </p>
        )}
      </Container>
    </div>
  );
}
