import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import VideoReelGallery from '@/components/VideoReelGallery';
import { actingReels } from '@/content/media';
import { selectedProjects } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { createInquiryHref } from '@/lib/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Acting',
  description: 'Film, television, commercial, musical, and stage acting portfolio for Bryan Mittelstadt.',
  path: '/acting',
});

export default function ActingPage() {
  const actingProjects = selectedProjects.filter((project) => project.discipline === 'Acting');
  const inquiryHref = createInquiryHref(siteConfig.email, 'Acting inquiry for Bryan Mittelstadt');

  return (
    <div className="min-h-screen pt-32 lg:pt-40">
      <section className="pb-20 lg:pb-28" aria-label="Acting reels">
        <Container>
          <div className="mb-10 max-w-3xl lg:mb-14">
            <SectionHeading as="h1" eyebrow="Performance Media">
              Acting Reels
            </SectionHeading>
            <p className="mt-6 body-text text-text-secondary">
              A category-ready reel library for dramatic, comedic, commercial, identity-led, musical, and stage performance work. Reel playback activates only after Bryan supplies approved media.
            </p>
          </div>
          <VideoReelGallery reels={actingReels} posterPreload />
        </Container>
      </section>

      <section aria-label="Acting portfolio" className="bg-bg-secondary py-20 lg:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
            <SectionHeading eyebrow="Portfolio" theme="dark">
              Selected Work
            </SectionHeading>
            <EditorialButton href={inquiryHref} variant="secondary" disabled={!inquiryHref}>
              Acting Inquiries
            </EditorialButton>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {actingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
