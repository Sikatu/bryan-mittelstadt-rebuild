'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Headshot } from '@/types';

interface HeadshotGalleryProps {
  headshots: Headshot[];
}

export default function HeadshotGallery({ headshots }: HeadshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const activeHeadshot = activeIndex === null ? null : headshots[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal();
    }

    if (activeIndex === null && dialog.open) {
      dialog.close();
    }
  }, [activeIndex]);

  function closeLightbox() {
    setActiveIndex(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  }

  function openLightbox(index: number, button: HTMLButtonElement) {
    openerRef.current = button;
    setActiveIndex(index);
  }

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + headshots.length) % headshots.length;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % headshots.length;
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
        {headshots.map((photo, index) => (
          <figure key={photo.id} className="group">
            <button
              type="button"
              onClick={(event) => openLightbox(index, event.currentTarget)}
              className="block w-full text-left"
              aria-label={`Open ${photo.label ?? photo.alt} in image viewer`}
            >
              <span className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-bg-light">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-12 text-xs font-medium uppercase tracking-[0.14em] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  View full image
                </span>
              </span>
            </button>
            <figcaption className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
                {photo.label ?? photo.category ?? 'Headshot'}
              </span>
              {photo.downloadUrl && (
                <a
                  href={photo.downloadUrl}
                  download
                  className="text-xs font-medium uppercase tracking-widest text-text-secondary underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/40"
                >
                  Download original
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[94vh] w-[min(94vw,72rem)] overflow-hidden rounded-sm border border-border-subtle bg-bg-primary p-0 text-text-primary shadow-2xl backdrop:bg-black/75"
        onClose={() => setActiveIndex(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') showPrevious();
          if (event.key === 'ArrowRight') showNext();
        }}
        aria-label="Headshot viewer"
      >
        {activeHeadshot && (
          <div className="grid max-h-[94vh] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="relative min-h-[62vh] bg-black lg:min-h-[86vh]">
              <Image
                src={activeHeadshot.src}
                alt={activeHeadshot.alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 94vw, 70vw"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  {activeHeadshot.category ?? 'Headshot'}
                </p>
                <h2 className="heading-section text-2xl">
                  {activeHeadshot.label ?? activeHeadshot.alt}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Image {activeIndex! + 1} of {headshots.length}. Use the left and right arrow keys to navigate.
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="min-h-11 border border-border-subtle px-4 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="min-h-11 border border-border-subtle px-4 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
                  >
                    Next
                  </button>
                </div>
                {activeHeadshot.downloadUrl && (
                  <a
                    href={activeHeadshot.downloadUrl}
                    download
                    className="inline-flex min-h-11 w-full items-center justify-center bg-accent px-5 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
                  >
                    Download Original
                  </a>
                )}
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="min-h-11 w-full px-4 py-3 text-xs font-medium uppercase tracking-widest text-text-secondary underline underline-offset-4 transition-colors hover:text-accent"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
