import Container from '@/components/Container';
import ContentPending from '@/components/ContentPending';
import CreativeProjectCard from '@/components/CreativeProjectCard';
import EditorialButton from '@/components/EditorialButton';
import SectionHeading from '@/components/SectionHeading';
import { writingAndFilmmakingProjects } from '@/content/media';
import { siteConfig } from '@/content/site';
import { createInquiryHref } from '@/lib/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Writing & Filmmaking',
  description: 'Screenwriting, directing, and producing projects by Bryan Mittelstadt.',
  path: '/writing-filmmaking',
});

export default function WritingFilmmakingPage() {
  const hasVerifiedProjects = writingAndFilmmakingProjects.length > 0;
  const inquiryHref = createInquiryHref(siteConfig.email, 'Writing and filmmaking inquiry for Bryan Mittelstadt');

  return (
    <div className="min-h-screen pb-20 pt-32 lg:pb-28 lg:pt-40">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <SectionHeading as="h1" eyebrow="Behind the Camera">
              Writing & Filmmaking
            </SectionHeading>
            <div className="mt-6 max-w-2xl">
              <p className="body-text text-text-secondary">
                A structured portfolio for screenwriting, directing, and independent producing, with support for loglines, roles, status, project media, screenings, and authorized excerpts.
              </p>
            </div>
          </div>
          <EditorialButton href={inquiryHref} disabled={!inquiryHref} variant="secondary">
            Creative Inquiries
          </EditorialButton>
        </div>

        {hasVerifiedProjects ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {writingAndFilmmakingProjects.map((project) => (
              <CreativeProjectCard key={project.title} project={project} />
            ))}
          </div>
        ) : (
          <ContentPending
            title="Portfolio credits are being verified"
            description="The finished project system is ready, but this section remains withheld until Bryan confirms the projects, contributions, loglines, statuses, imagery, excerpts, and public links that may be published."
            items={[
              'Verified project titles and Bryan’s exact contributions',
              'Approved loglines, statuses, and project types',
              'Project stills, posters, scripts, or authorized excerpts',
              'Screening, release, press, or portfolio links',
            ]}
          />
        )}
      </Container>
    </div>
  );
}
