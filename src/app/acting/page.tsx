import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import HeadshotGallery from '@/components/HeadshotGallery';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import VideoReelGallery from '@/components/VideoReelGallery';
import { actingReels, headshots } from '@/content/media';
import { featuredProjects, selectedProjects } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { createInquiryHref } from '@/lib/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Acting',
  description: 'Film, television, commercial, musical, and stage acting portfolio for Bryan Mittelstadt.',
  path: '/acting',
});

export default function ActingPage() {
  const actingProjects = [...featuredProjects, ...selectedProjects].filter(
    (project) => project.discipline === 'Acting',
  );

  const inquiryHref = createInquiryHref(
    siteConfig.email,
    'Acting inquiry for Bryan Mittelstadt',
  );

  const physical = siteConfig.physical;

  const castingStats = physical
    ? [
        ['Height', physical.height],
        ['Weight', physical.weight],
        ['Hair', physical.hair],
        ['Eyes', physical.eyes],
        ['Voice', physical.voice],
      ]
    : [];

  return (
    <div className="min-h-screen">
      <section
        aria-labelledby="acting-page-title"
        className="border-b border-[#d8d1c7] bg-[#f1ede7] pt-28 sm:pt-32 lg:pt-36"
      >
        <Container>
          <div className="grid gap-10 pb-16 sm:pb-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16 lg:pb-24">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-10 bg-accent/65" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                  Performance
                </p>
              </div>

              <h1
                id="acting-page-title"
                className="heading-display text-[clamp(4.6rem,10vw,9rem)] leading-[0.82] tracking-[-0.045em] text-text-primary"
              >
                Acting
              </h1>
            </div>

            <div className="max-w-xl lg:justify-self-end">
              <p className="text-[1rem] leading-8 text-text-secondary sm:text-[1.05rem]">
                Film, television, commercial, musical, and stage performance,
                with reel categories built for fast casting review.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <EditorialButton href="#acting-reels" variant="primary">
                  Watch Reels
                </EditorialButton>

                <EditorialButton href={siteConfig.resumeUrl} variant="secondary">
                  View R&eacute;sum&eacute;
                </EditorialButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-[#d8d1c7] sm:grid-cols-5">
            {castingStats.map(([label, value], index) => (
              <div
                key={label}
                className={`py-4 sm:px-5 sm:py-5 ${
                  index > 0 ? 'border-l border-[#d8d1c7]' : ''
                } ${
                  index >= 2 ? 'border-t border-[#d8d1c7] sm:border-t-0' : ''
                }`}
              >
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {label}
                </span>
                <strong className="mt-1.5 block font-serif text-[1.1rem] font-normal text-text-primary">
                  {value}
                </strong>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="acting-reels"
        aria-label="Acting reels"
        className="bg-[#f8f7f3] py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-end lg:gap-16">
            <SectionHeading eyebrow="Reels" theme="dark">
              Performance Library
            </SectionHeading>

            <p className="max-w-md text-sm leading-7 text-text-secondary lg:justify-self-end">
              {actingReels.length} available reels spanning dramatic, comedy,
              commercial, identity-led, musical, classical voice, and stage work.
            </p>
          </div>

          <VideoReelGallery reels={actingReels} posterPreload />
        </Container>
      </section>

      <section
        id="headshots"
        aria-label="Casting Gallery"
        className="border-y border-[#d8d1c7] bg-[#f1ede7] py-20 sm:py-24 lg:py-32"
      >
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-12">
            <SectionHeading eyebrow="Casting" theme="dark">Casting Gallery</SectionHeading>

            <EditorialButton href="/headshots" variant="text">
              Full Casting Gallery
            </EditorialButton>
          </div>

          <HeadshotGallery headshots={headshots.slice(0, 6)} />
        </Container>
      </section>

      {actingProjects.length > 0 && (
        <section
          aria-label="Acting portfolio"
          className="bg-[#f8f7f3] py-20 sm:py-24 lg:py-32"
        >
          <Container>
            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-14">
              <SectionHeading eyebrow="Credits">
                Selected Acting Work
              </SectionHeading>

              <EditorialButton href="/resume" variant="text">
                View Full R&eacute;sum&eacute;
              </EditorialButton>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
              {actingProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section
        aria-label="Casting materials and acting inquiries"
        className="border-t border-[#d8d1c7] bg-[#f1ede7] py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:items-end lg:gap-16">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                Casting Materials
              </p>

              <h2 className="heading-display max-w-3xl text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.03em] text-text-primary">
                Reels, headshots,
                <br className="hidden sm:block" />
                {' '}and r&eacute;sum&eacute;.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-self-end">
              <EditorialButton href={siteConfig.resumeUrl} variant="primary">
                Download R&eacute;sum&eacute;
              </EditorialButton>

              <EditorialButton
                href={inquiryHref}
                variant="secondary"
                disabled={!inquiryHref}
              >
                Acting Inquiries
              </EditorialButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
