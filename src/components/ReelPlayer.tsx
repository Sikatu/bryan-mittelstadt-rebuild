'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from './Container';
import SectionHeading from './SectionHeading';
import MediaFrame from './MediaFrame';
import { siteAssets } from '@/content/assets';
import { siteConfig } from '@/content/site';

function ReelPoster({ interactive = false }: { interactive?: boolean }) {
  return (
    <>
      <Image
        src={siteAssets.reelPosterImage}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 896px"
      />
      <div className={`absolute inset-0 bg-contrast-dark/40 ${interactive ? 'transition-all duration-500 group-hover:bg-contrast-dark/30' : ''}`} />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-contrast-light/60 sm:h-20 sm:w-20 ${interactive ? 'transition-all duration-500 group-hover:scale-110 group-hover:border-accent' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-contrast-light sm:h-8 sm:w-8" aria-hidden="true">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        </div>
        {!interactive && (
          <span className="text-xs uppercase tracking-widest text-contrast-light/70">
            Reel Coming Soon
          </span>
        )}
      </div>
    </>
  );
}

export default function ReelPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasReel = !!siteConfig.reelUrl;

  return (
    <section id="reel" aria-label="Acting reel" className="py-20 lg:py-28">
      <Container>
        <div className="mb-10 lg:mb-14">
          <SectionHeading eyebrow="Featured Reel" align="center">
            {siteConfig.reelYear ? `${siteConfig.reelYear} Acting Reel` : 'Acting Reel'}
          </SectionHeading>
          <p className="mt-4 text-center text-sm text-text-secondary max-w-xl mx-auto">
            Selected work across film, television, and stage.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <MediaFrame aspectRatio="video" className="rounded-sm">
            {isPlaying && hasReel ? (
              <iframe
                src={`https://www.youtube.com/embed/${siteConfig.reelUrl}?autoplay=1&rel=0`}
                title={`${siteConfig.name} — ${siteConfig.reelYear ?? ''} Acting Reel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            ) : hasReel ? (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center"
                aria-label="Play acting reel"
              >
                <ReelPoster interactive />
              </button>
            ) : (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center" role="status">
                <ReelPoster />
              </div>
            )}
          </MediaFrame>

          {/* Fallback link */}
          {hasReel && (
            <p className="mt-4 text-center text-xs text-text-muted">
              <a
                href={`https://www.youtube.com/watch?v=${siteConfig.reelUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300 underline underline-offset-2"
              >
                Watch on YouTube
              </a>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
