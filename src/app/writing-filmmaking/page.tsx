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
  description: 'Screenwriting and directing projects by Bryan Mittelstadt.',
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
                Current original writing and directing work supplied for Bryan&apos;s website,
                presented with the client-approved project titles, contributions, and loglines.
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
            title="Writing and directing portfolio pending"
            description="No client-approved project entries are currently configured."
            items={[
              'Approved project titles and contributions',
              'Approved loglines and project types',
            ]}
          />
        )}
      </Container>
    </div>
  );
}
