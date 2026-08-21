import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import EditorialButton from '@/components/EditorialButton';
import HeroSection from '@/components/HeroSection';
import CredibilityStrip from '@/components/CredibilityStrip';
import ReelPlayer from '@/components/ReelPlayer';
import ProjectFeature from '@/components/ProjectFeature';
import ProjectCard from '@/components/ProjectCard';
import DisciplineLink from '@/components/DisciplineLink';
import AboutPreview from '@/components/AboutPreview';
import ContactCTA from '@/components/ContactCTA';
import { featuredProjects, selectedProjects, disciplines } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { getReelVideoJsonLd } from '@/lib/structured-data';

export const metadata = createPageMetadata({
  title: siteConfig.seo.siteTitle,
  description: siteConfig.seo.siteDescription,
  absoluteTitle: true,
});

export default function Home() {
  const reelJsonLd = getReelVideoJsonLd();

  return (
    <>
      <HeroSection />
      
      <CredibilityStrip />

      <ReelPlayer />

      {/* Current Work Section */}
      {featuredProjects.length > 0 && (
        <section aria-label="Current work" className="border-y border-[#d8d1c7] bg-[#f1ede7] py-24 sm:py-28 lg:py-36">
          <Container>
            <div className="mb-12 lg:mb-16">
              <SectionHeading eyebrow="Now" theme="dark">
                Current Work
              </SectionHeading>
            </div>
            
            <div className="space-y-20 lg:space-y-28">
              {featuredProjects.map((project, index) => (
                <ProjectFeature 
                  key={project.title} 
                  project={project} 
                  reverse={index % 2 !== 0} 
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Selected Work Section */}
      {selectedProjects.length > 0 && (
        <section aria-label="Selected projects portfolio" className="bg-bg-primary py-24 sm:py-28 lg:py-36">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
              <SectionHeading eyebrow="Portfolio">
                Selected Work
              </SectionHeading>
              <EditorialButton href="/resume" variant="text">
                View Full Résumé
              </EditorialButton>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
              {selectedProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Disciplines Section */}
      <section
        aria-label="Creative disciplines"
        className="border-t border-[#d8d1c7] bg-[#f1ede7] py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-end lg:gap-16">
            <SectionHeading eyebrow="Disciplines" theme="dark">
              Multidisciplinary Artist
            </SectionHeading>

            <p className="max-w-md text-sm leading-7 text-text-secondary lg:justify-self-end">
              Acting leads the work. Voice-over, music,
              writing, and filmmaking extend the same
              performance-driven practice.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => (
              <DisciplineLink
                key={discipline.title}
                discipline={discipline}
              />
            ))}
          </div>
        </Container>
      </section>

      <AboutPreview />
      <ContactCTA />

      {/* Reel Structured Data */}
      {reelJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reelJsonLd),
          }}
        />
      )}
    </>
  );
}
