'use client';

import { useRef, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import EditorialButton from './EditorialButton';
import MediaStatusBadge from './MediaStatusBadge';
import { formatMediaTime } from '@/lib/media';
import type { AudioReel } from '@/types';

export default function AudioReelPlayer({ reel }: { reel: AudioReel }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const hasAudio = reel.availability === 'available' && Boolean(reel.audioUrl);
  const isDirect = hasAudio && reel.sourceType !== 'external';

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setHasError(true);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seek(value: number) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <article className="border border-border-subtle bg-bg-secondary p-6 sm:p-7">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <MediaStatusBadge availability={reel.availability} />
          <h2 className="mt-3 font-serif text-2xl text-text-primary">{reel.title}</h2>
          <p className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-accent">{reel.category}</p>
          {reel.description && (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">{reel.description}</p>
          )}
        </div>

        {hasAudio && reel.sourceType === 'external' ? (
          <EditorialButton href={reel.audioUrl} external variant="secondary">
            Open Audio
          </EditorialButton>
        ) : !hasAudio ? (
          <EditorialButton disabled variant="secondary" title="Approved audio has not been supplied yet">
            Audio Pending
          </EditorialButton>
        ) : null}
      </div>

      {isDirect && (
        <div className="mt-6 border-t border-border-light pt-5">
          <audio
            ref={audioRef}
            src={reel.audioUrl}
            preload="metadata"
            onLoadedMetadata={(event: SyntheticEvent<HTMLAudioElement>) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event: SyntheticEvent<HTMLAudioElement>) => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlayback}
              className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-contrast-dark text-contrast-light transition hover:bg-accent"
              aria-label={`${isPlaying ? 'Pause' : 'Play'} ${reel.title}`}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="min-w-0 flex-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => seek(Number(event.target.value))}
                className="w-full accent-accent"
                aria-label={`${reel.title} playback position`}
                disabled={!duration || hasError}
              />
              <div className="mt-1 flex justify-between text-xs tabular-nums text-text-muted">
                <span>{formatMediaTime(currentTime)}</span>
                <span>{reel.durationLabel ?? formatMediaTime(duration)}</span>
              </div>
            </div>
          </div>
          {hasError && (
            <p className="mt-3 text-sm text-text-secondary" role="status">
              This audio could not be loaded. Use the approved hosted link when one is supplied.
            </p>
          )}
        </div>
      )}
    </article>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5" aria-hidden="true">
      <path d="M7.5 5.2a1.25 1.25 0 0 1 1.9-1.06l10 6.3a1.25 1.25 0 0 1 0 2.12l-10 6.3A1.25 1.25 0 0 1 7.5 17.8V5.2Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5v-13ZM13 5.5A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-13Z" />
    </svg>
  );
}
