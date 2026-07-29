import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import EditorialButton from '@/components/EditorialButton';
import HeroSection from '@/components/HeroSection';
import CredibilityStrip from '@/components/CredibilityStrip';
import ReelPlayer from '@/components/ReelPlayer';
import ProjectFeature from '@/components/ProjectFeature';
import ProjectCard from '@/components/ProjectCard';
import DisciplineLink from '@/components/DisciplineLink';
import ContactCTA from '@/components/ContactCTA';
import { featuredProjects, selectedProjects, disciplines } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import { getReelVideoJsonLd } from '@/lib/structured-data';

export const metadata = createPageMetadata({
  title: siteConfig.seo.siteTitle,
  description: siteConfig.seo.siteDescription,
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
        <section aria-label="Current work" className="py-20 lg:py-28 bg-bg-secondary">
          <Container>
            <div className="mb-12 lg:mb-16">
              <SectionHeading eyebrow="Now" theme="dark">
                Current Work
              </SectionHeading>
            </div>
            
            <div className="space-y-20 lg:space-y-32">
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
        <section aria-label="Selected projects portfolio" className="py-20 lg:py-28">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
              <SectionHeading eyebrow="Portfolio">
                Selected Work
              </SectionHeading>
              <EditorialButton href="/resume" variant="text">
                View Full Résumé
              </EditorialButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {selectedProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Disciplines Section */}
      <section aria-label="Creative disciplines" className="py-20 lg:py-28 bg-bg-secondary">
        <Container>
          <div className="mb-12 lg:mb-16">
            <SectionHeading eyebrow="Disciplines" align="center" theme="dark">
              Multidisciplinary Artist
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((discipline, index) => (
              <DisciplineLink
                key={discipline.title}
                discipline={discipline}
                size={index % 3 === 0 ? 'large' : 'small'}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Short Biography Section */}
      <section aria-label="About Bryan" className="py-20 lg:py-28 border-t border-border-subtle">
        <Container narrow>
          <div className="text-center">
            <SectionHeading eyebrow="About" align="center" as="h3">
              Bryan Mittelstadt
            </SectionHeading>
            <div className="mt-8 text-text-secondary leading-relaxed space-y-6">
              <p>{siteConfig.shortBio}</p>
            </div>
            <div className="mt-10">
              <EditorialButton href="/about" variant="secondary">
                Read Full Biography
              </EditorialButton>
            </div>
          </div>
        </Container>
      </section>

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
