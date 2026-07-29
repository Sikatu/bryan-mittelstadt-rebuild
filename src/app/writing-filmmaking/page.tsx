import Container from '@/components/Container';
import ContentPending from '@/components/ContentPending';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import { writingAndFilmmakingProjects } from '@/content/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Writing & Filmmaking',
  description: 'Screenwriting, directing, and producing projects by Bryan Mittelstadt.',
  path: '/writing-filmmaking',
});

export default function WritingFilmmakingPage() {
  const hasVerifiedProjects = writingAndFilmmakingProjects.length > 0;

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <div className="mb-12 lg:mb-16">
          <SectionHeading as="h1" eyebrow="Behind the Camera">
            Writing & Filmmaking
          </SectionHeading>
          <div className="mt-6 max-w-2xl">
            <p className="body-text text-text-secondary">
              Screenwriting, directing, and independent producing across narrative and music-driven work.
            </p>
          </div>
        </div>

        {hasVerifiedProjects ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {writingAndFilmmakingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        ) : (
          <ContentPending
            title="Portfolio credits are being verified"
            description="This section is intentionally withheld until Bryan confirms the projects, roles, descriptions, imagery, and links that should be published. No invented portfolio credits are displayed."
            items={[
              'Verified writing credits and project descriptions',
              'Directing and producing credits',
              'Project stills, posters, or script excerpts',
              'Public links, screenings, or release information',
            ]}
          />
        )}
      </Container>
    </div>
  );
}
