import Container from './Container';
import EditorialButton from './EditorialButton';
import EditorialImage from './EditorialImage';
import { siteAssets } from '@/content/assets';
import { siteConfig } from '@/content/site';

export default function AboutPreview() {
  return (
    <section
      aria-label="About Bryan"
      className="border-t border-[#d8d1c7] bg-[#f8f7f3] py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#d8d1c7] bg-bg-light shadow-[0_22px_64px_rgba(44,35,27,0.09)]">
              <EditorialImage
                asset={siteAssets.portraitImage}
                sizes="(max-width: 1024px) 100vw, 42vw"
                imageClassName="brightness-[0.94] contrast-[1.02] saturate-[0.94]"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-4">
            <div className="mb-6 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-accent/65"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                About
              </p>
            </div>

            <h2 className="heading-display max-w-2xl text-[clamp(3.4rem,6vw,6rem)] leading-[0.91] tracking-[-0.03em] text-text-primary">
              Bryan
              <br />
              Mittelstadt
            </h2>

            <p className="mt-8 max-w-[42rem] text-[1rem] leading-8 text-text-secondary sm:text-[1.05rem]">
              {siteConfig.shortBio}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <EditorialButton
                href="/about"
                variant="secondary"
              >
                Read Full Biography
              </EditorialButton>

              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
