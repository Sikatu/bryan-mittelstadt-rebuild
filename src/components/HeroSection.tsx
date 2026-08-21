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
    label: 'Bryan Mittelstadt in an editorial portrait',
    objectPosition: '68% 42%',
    imageClassName:
      'brightness-[0.72] contrast-[1.05] saturate-[0.90]',
  },
  {
    src: '/images/bryan/current-site/featured/home-dsc-1685.jpeg',
    label: 'Bryan Mittelstadt in a landscape editorial portrait',
    objectPosition: '64% 42%',
    imageClassName:
      'brightness-[0.70] contrast-[1.05] saturate-[0.90]',
  },
  {
    src: '/images/bryan/current-site/print/print-18-couch.jpg',
    label: 'Bryan Mittelstadt seated on a couch in an editorial portrait',
    objectPosition: '68% 48%',
    imageClassName:
      'brightness-[0.70] contrast-[1.05] saturate-[0.90]',
  },
  {
    src: '/images/bryan/current-site/print/print-16-staircase.jpg',
    label: 'Bryan Mittelstadt in an architectural staircase portrait',
    objectPosition: '66% 44%',
    imageClassName:
      'brightness-[0.70] contrast-[1.05] saturate-[0.90]',
  },
] as const;

const slideDuration = 9000;
const manualNavigationPause = 12000;

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTemporarilyPaused, setIsTemporarilyPaused] =
    useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const resumeTimeoutRef = useRef<number | null>(null);

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
    if (isTemporarilyPaused || reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(
      showNextSlide,
      slideDuration,
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    activeSlide,
    isTemporarilyPaused,
    reduceMotion,
    showNextSlide,
  ]);

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
                  ? 'scale-[1.02] opacity-100'
                  : 'scale-[1.045] opacity-0'
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.72)_36%,rgba(0,0,0,0.30)_68%,rgba(0,0,0,0.08)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.17)_0%,transparent_38%,rgba(0,0,0,0.52)_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_32%,rgba(239,183,145,0.12)_0%,rgba(154,93,58,0.04)_26%,transparent_51%)]"
      />

      <Container className="relative z-10 py-28 sm:py-32 lg:py-36">
        <div className="max-w-[56rem]">
          <h1 className="heading-display max-w-[55rem] text-[clamp(4rem,8.4vw,7.6rem)] leading-[0.88] tracking-[-0.025em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.28)]">
            {siteConfig.name}
          </h1>

          <p className="mt-7 max-w-2xl font-sans text-[0.84rem] font-medium uppercase tracking-[0.20em] text-white/78 sm:text-[0.92rem] sm:tracking-[0.23em]">
            {siteConfig.titles.join('  •  ')}
          </p>

          <div className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
            <EditorialButton
              href="/#reel"
              variant="secondary"
              className="min-h-12 min-w-[12.75rem] border-white bg-white px-7 text-contrast-dark shadow-[0_14px_36px_rgba(0,0,0,0.22)] hover:border-[#EFC3A8] hover:bg-[#EFC3A8]"
            >
              {hasAvailableActingReel
                ? 'Watch Acting Reel'
                : 'Explore Acting Reels'}
            </EditorialButton>

            <EditorialButton
              href={siteConfig.resumeUrl ?? '/resume'}
              variant="secondary"
              download={Boolean(siteConfig.resumeUrl)}
              className="min-h-12 min-w-[12.75rem] border-white/38 bg-black/18 px-7 text-white backdrop-blur-[2px] hover:border-white/75 hover:bg-white/10 hover:text-white"
            >
              View Résumé
            </EditorialButton>
          </div>
        </div>

        <div className="absolute bottom-7 right-5 hidden items-center gap-3 sm:flex sm:right-8 lg:right-12">
          <button
            type="button"
            onClick={showPreviousManually}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-black/18 text-white/58 backdrop-blur-md transition-colors duration-300 hover:border-white/35 hover:bg-white/8 hover:text-white"
            aria-label="Show previous hero image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.35}
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

          <span className="min-w-[4.7rem] text-center text-[10px] font-medium tracking-[0.18em] text-white/52">
            {String(activeSlide + 1).padStart(2, '0')}
            {' / '}
            {String(heroSlides.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={showNextManually}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-black/18 text-white/58 backdrop-blur-md transition-colors duration-300 hover:border-white/35 hover:bg-white/8 hover:text-white"
            aria-label="Show next hero image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.35}
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
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:hidden">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() =>
                selectSlideManually(index)
              }
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? 'w-8 bg-white/90'
                  : 'w-2 bg-white/30'
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
