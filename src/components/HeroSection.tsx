'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Container from './Container';
import EditorialButton from './EditorialButton';
import { hasAvailableActingReel } from '@/content/media';
import { siteConfig } from '@/content/site';

const heroSlides = [
  {
    src: '/images/bryan/current-site/featured/hero-primary.jpg',
    label: 'Bryan Mittelstadt seated in a warmly lit interior',
    objectPosition: '65% 43%',
    imageClassName:
      'brightness-[0.88] contrast-[1.03] saturate-[0.98]',
  },
  {
    src: '/images/bryan/current-site/featured/home-dsc-1685.jpeg',
    label: 'Editorial portrait of Bryan Mittelstadt',
    objectPosition: '70% 34%',
    imageClassName:
      'brightness-[0.80] contrast-[1.04] saturate-[0.92]',
  },
  {
    src: '/images/bryan/current-site/print/print-18-couch.jpg',
    label: 'Bryan Mittelstadt seated on a vintage couch',
    objectPosition: '68% 42%',
    imageClassName:
      'brightness-[0.82] contrast-[1.05] saturate-[0.92]',
  },
  {
    src: '/images/bryan/current-site/print/print-16-staircase.jpg',
    label: 'Bryan Mittelstadt on an architectural staircase',
    objectPosition: '72% 42%',
    imageClassName:
      'brightness-[0.76] contrast-[1.08] saturate-[0.78]',
  },
] as const;

const slideDuration = 9000;
const manualNavigationPause = 12000;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] =
    useState(false);
  const [isTemporarilyPaused, setIsTemporarilyPaused] =
    useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  /*
   * Browser timers return a numeric ID. Keeping this ref explicitly
   * browser-shaped avoids conflicts with the Node.js Timeout type.
   */
  const resumeTimeoutRef = useRef<number | null>(null);

  const isPaused =
    isManuallyPaused ||
    isTemporarilyPaused ||
    reduceMotion;

  const showPreviousSlide = useCallback(() => {
    setActiveSlide((current) =>
      current === 0
        ? heroSlides.length - 1
        : current - 1,
    );
  }, []);

  const showNextSlide = useCallback(() => {
    setActiveSlide(
      (current) => (current + 1) % heroSlides.length,
    );
  }, []);

  const temporarilyPause = useCallback(() => {
    setIsTemporarilyPaused(true);

    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsTemporarilyPaused(false);
      resumeTimeoutRef.current = null;
    }, manualNavigationPause);
  }, []);

  const showPreviousManually = useCallback(() => {
    showPreviousSlide();
    temporarilyPause();
  }, [showPreviousSlide, temporarilyPause]);

  const showNextManually = useCallback(() => {
    showNextSlide();
    temporarilyPause();
  }, [showNextSlide, temporarilyPause]);

  const selectSlideManually = useCallback(
    (index: number) => {
      setActiveSlide(index);
      temporarilyPause();
    },
    [temporarilyPause],
  );

  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updateMotionPreference = () => {
      setReduceMotion(motionQuery.matches);
    };

    updateMotionPreference();
    motionQuery.addEventListener(
      'change',
      updateMotionPreference,
    );

    return () => {
      motionQuery.removeEventListener(
        'change',
        updateMotionPreference,
      );
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = window.setInterval(
      showNextSlide,
      slideDuration,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [activeSlide, isPaused, showNextSlide]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      aria-label="Introduction"
      aria-roledescription="carousel"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-contrast-dark"
    >
      <div className="absolute inset-0 -z-20 bg-black">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <Image
              key={slide.src}
              src={slide.src}
              alt=""
              fill
              preload={index === 0}
              quality={88}
              sizes="100vw"
              aria-hidden="true"
              className={`object-cover transition-[opacity,transform,filter] duration-[1600ms] ease-out motion-reduce:transition-none ${
                slide.imageClassName
              } ${
                isActive
                  ? 'scale-[1.025] opacity-100'
                  : 'scale-[1.055] opacity-0'
              }`}
              style={{
                objectPosition: slide.objectPosition,
              }}
            />
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/94 via-black/57 to-black/6"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-transparent to-black/52"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_31%,rgba(255,220,185,0.16)_0%,rgba(213,137,89,0.07)_22%,transparent_48%)]"
      />

      <Container className="relative z-10 py-28 sm:py-32 lg:py-36">
        <div className="max-w-[58rem]">
          <div className="mb-7 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#E7A985]/80 sm:w-10"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/78">
              Official Portfolio
            </p>
          </div>

          <h1 className="heading-display max-w-[56rem] text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.26)]">
            {siteConfig.name}
          </h1>

          <p className="mt-7 font-sans text-base font-medium tracking-[0.075em] text-white/94 sm:text-lg">
            {siteConfig.titles.join(' • ')}
          </p>

          <p className="mt-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-white/68 sm:text-sm">
            {siteConfig.location}
          </p>

          <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <EditorialButton
              href="/#reel"
              variant="secondary"
              className="min-h-12 min-w-[13.5rem] border-white bg-white px-7 text-contrast-dark shadow-[0_12px_34px_rgba(0,0,0,0.24)] hover:border-[#F0C4AA] hover:bg-[#F0C4AA]"
            >
              {hasAvailableActingReel
                ? 'Watch Acting Reel'
                : 'Explore Acting Reels'}
            </EditorialButton>

            <EditorialButton
              href={siteConfig.resumeUrl ?? '/resume'}
              variant="secondary"
              download={Boolean(siteConfig.resumeUrl)}
              className="min-h-12 min-w-[13.5rem] border-white/55 bg-black/25 px-7 text-white backdrop-blur-sm hover:border-white hover:bg-white/12 hover:text-white"
            >
              {siteConfig.resumeUrl
                ? 'Download Résumé'
                : 'View Résumé'}
            </EditorialButton>
          </div>

          <div className="mt-6">
            <EditorialButton
              href="/contact"
              variant="text"
              className="text-white/78 decoration-white/30 hover:text-white hover:decoration-white"
            >
              Contact Representation
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </EditorialButton>
          </div>
        </div>

        <div className="absolute bottom-7 right-5 hidden items-center gap-4 sm:flex sm:right-8 lg:right-12">
          <div className="flex items-center rounded-full border border-white/20 bg-black/30 p-1 shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-md">
            <button
              type="button"
              onClick={showPreviousManually}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Show previous hero image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.4}
                stroke="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <span className="min-w-[4.75rem] text-center text-[10px] font-medium tracking-[0.2em] text-white/72">
              {String(activeSlide + 1).padStart(2, '0')}
              {' / '}
              {String(heroSlides.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={showNextManually}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Show next hero image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.4}
                stroke="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <span
              aria-hidden="true"
              className="mx-1 h-5 w-px bg-white/15"
            />

            <button
              type="button"
              onClick={() =>
                setIsManuallyPaused(
                  (current) => !current,
                )
              }
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={
                isManuallyPaused
                  ? 'Play hero slideshow'
                  : 'Pause hero slideshow'
              }
              aria-pressed={isManuallyPaused}
            >
              {isManuallyPaused ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v13.72L19 12 8 5.14Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" />
                </svg>
              )}
            </button>
          </div>

          <a
            href="#reel"
            className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.26em] text-white/58 transition-colors duration-300 hover:text-white focus-visible:text-white"
            aria-label="Explore the featured acting reel"
          >
            <span>Explore</span>

            <span
              aria-hidden="true"
              className="h-px w-7 bg-current opacity-60"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.25}
              stroke="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </a>
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:hidden">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() =>
                selectSlideManually(index)
              }
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'w-7 bg-white'
                  : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Show hero image ${index + 1}`}
              aria-current={
                index === activeSlide
                  ? 'true'
                  : undefined
              }
            />
          ))}
        </div>

        <p
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing hero image {activeSlide + 1} of{' '}
          {heroSlides.length}:{' '}
          {heroSlides[activeSlide].label}
        </p>
      </Container>
    </section>
  );
}
