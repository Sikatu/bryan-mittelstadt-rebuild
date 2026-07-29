import Image from 'next/image';
import Container from './Container';
import EditorialButton from './EditorialButton';
import { siteAssets } from '@/content/assets';
import { siteConfig } from '@/content/site';

export default function HeroSection() {
  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={siteAssets.heroImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlays for text readability and transition to light theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-contrast-dark/80 via-contrast-dark/30 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-contrast-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-contrast-light mb-5">
            {siteConfig.name}
          </h1>

          <p className="text-base sm:text-lg text-contrast-light/90 tracking-wider font-sans mb-3">
            {siteConfig.titles.join(' \u2022 ')}
          </p>

          <p className="text-sm text-contrast-light/70 tracking-widest uppercase font-sans mb-10">
            {siteConfig.location}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <EditorialButton
              href="/#reel"
              variant="primary"
            >
              {siteConfig.reelUrl ? `Watch ${siteConfig.reelYear ?? ''} Reel` : 'Acting Reel'}
            </EditorialButton>

            <EditorialButton
              href={siteConfig.resumeUrl ?? '/resume'}
              variant="secondary"
              download={Boolean(siteConfig.resumeUrl)}
            >
              {siteConfig.resumeUrl ? 'Download Résumé' : 'View Résumé'}
            </EditorialButton>

            <EditorialButton href="/contact" variant="text">
              Contact Representation
            </EditorialButton>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Explore
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-5 h-5 text-text-muted"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </Container>
    </section>
  );
}
