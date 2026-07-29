import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import ReelPlayer from '@/components/ReelPlayer';
import { selectedProjects } from '@/content/projects';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Acting',
  description: 'Film, television, and stage acting portfolio for Bryan Mittelstadt.',
  path: '/acting',
});

export default function ActingPage() {
  const actingProjects = selectedProjects.filter(p => p.discipline === 'Acting');

  return (
    <div className="pt-20">
      {/* Page Header (handled by ReelPlayer's internal structure but we'll add a top buffer) */}
      <div className="pt-12">
        <ReelPlayer />
      </div>

      <section aria-label="Acting Portfolio" className="py-20 lg:py-28 bg-bg-secondary">
        <Container>
          <div className="mb-12 lg:mb-16">
            <SectionHeading eyebrow="Portfolio" theme="dark">
              Selected Work
            </SectionHeading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {actingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
