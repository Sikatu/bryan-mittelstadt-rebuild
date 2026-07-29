'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import EditorialButton from './EditorialButton';
import MediaFrame from './MediaFrame';
import MediaStatusBadge from './MediaStatusBadge';
import { siteAssets } from '@/content/assets';
import { resolveVideoUrl } from '@/lib/media';
import type { VideoReel } from '@/types';

export default function VideoReelGallery({
  reels,
  showSelector = true,
}: {
  reels: VideoReel[];
  showSelector?: boolean;
}) {
  const initialId = reels.find((reel) => reel.availability === 'available')?.id ?? reels[0]?.id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [isPlaying, setIsPlaying] = useState(false);

  const selected = reels.find((reel) => reel.id === selectedId) ?? reels[0];
  const resolved = useMemo(() => resolveVideoUrl(selected?.url), [selected?.url]);
  const canEmbed = selected?.availability === 'available' && Boolean(resolved?.embedUrl);
  const canOpen = selected?.availability === 'available' && Boolean(resolved?.watchUrl);

  if (!selected) return null;

  function selectReel(id: string) {
    setSelectedId(id);
    setIsPlaying(false);
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl">
        <MediaFrame aspectRatio="video" className="rounded-sm">
          {canEmbed && isPlaying ? (
            <iframe
              src={`${resolved?.embedUrl}${resolved?.embedUrl?.includes('?') ? '&' : '?'}autoplay=1`}
              title={`${selected.title} — Bryan Mittelstadt`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-contrast-dark">
              <Image
                src={selected.posterImage ?? siteAssets.reelPosterImage}
                alt=""
                fill
                className="object-cover opacity-65"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-contrast-dark/80 via-contrast-dark/20 to-contrast-dark/20" />
              <div className="relative z-10 flex max-w-xl flex-col items-center px-6 text-center">
                <MediaStatusBadge availability={selected.availability} theme="dark" />
                <h2 className="mt-4 font-serif text-3xl text-contrast-light sm:text-4xl">
                  {selected.title}
                </h2>
                {selected.description && (
                  <p className="mt-3 text-sm leading-relaxed text-contrast-light/75 sm:text-base">
                    {selected.description}
                  </p>
                )}
                {canEmbed ? (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="mt-7 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-contrast-light/70 text-contrast-light transition hover:scale-105 hover:border-accent hover:text-accent"
                    aria-label={`Play ${selected.title}`}
                  >
                    <PlayIcon />
                  </button>
                ) : canOpen ? (
                  <EditorialButton
                    href={resolved?.watchUrl}
                    external
                    variant="secondary"
                    className="mt-7 border-contrast-light/50 bg-transparent text-contrast-light hover:border-accent hover:text-accent"
                  >
                    Open Reel
                  </EditorialButton>
                ) : (
                  <p className="mt-7 text-xs uppercase tracking-[0.18em] text-contrast-light/60">
                    Awaiting Bryan’s approved media link
                  </p>
                )}
              </div>
            </div>
          )}
        </MediaFrame>
      </div>

      {showSelector && reels.length > 1 && (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Acting reel categories">
          {reels.map((reel) => {
          const active = reel.id === selected.id;
          return (
            <button
              key={reel.id}
              type="button"
              onClick={() => selectReel(reel.id)}
              aria-pressed={active}
              className={`border p-5 text-left transition ${
                active
                  ? 'border-accent bg-bg-secondary'
                  : 'border-border-subtle bg-bg-light hover:border-accent/70'
              }`}
            >
              <MediaStatusBadge availability={reel.availability} />
              <span className="mt-3 block font-serif text-xl text-text-primary">{reel.title}</span>
              <span className="mt-1 block text-sm text-text-secondary">{reel.category}</span>
            </button>
          );
          })}
        </div>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7" aria-hidden="true">
      <path d="M7.5 5.2a1.25 1.25 0 0 1 1.9-1.06l10 6.3a1.25 1.25 0 0 1 0 2.12l-10 6.3A1.25 1.25 0 0 1 7.5 17.8V5.2Z" />
    </svg>
  );
}
