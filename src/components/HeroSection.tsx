import Container from './Container';
import EditorialButton from './EditorialButton';
import EditorialImage from './EditorialImage';
import { siteAssets } from '@/content/assets';
import { hasAvailableActingReel } from '@/content/media';
import { siteConfig } from '@/content/site';

export default function HeroSection() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <EditorialImage
          asset={siteAssets.heroImage}
          sizes="100vw"
          priority
          decorative
          imageClassName="scale-[1.01]"
          fallbackLabel="Primary photography pending"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-contrast-dark/80 via-contrast-dark/35 to-bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-contrast-dark/60 via-contrast-dark/20 to-transparent" />
      </div>

      <Container className="relative z-10 pt-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-contrast-light/65">
            Official Portfolio
          </p>
          <h1 className="heading-display mb-5 text-4xl text-contrast-light sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>

          <p className="mb-3 font-sans text-base tracking-wider text-contrast-light/90 sm:text-lg">
            {siteConfig.titles.join(' \u2022 ')}
          </p>

          <p className="mb-10 font-sans text-sm uppercase tracking-widest text-contrast-light/70">
            {siteConfig.location}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <EditorialButton href="/#reel" variant="primary">
              {hasAvailableActingReel ? 'Watch Acting Reel' : 'Explore Acting Reels'}
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

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 motion-safe:animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Explore
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="h-5 w-5 text-text-muted"
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
