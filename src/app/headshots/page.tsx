import Container from '@/components/Container';
import ContentPending from '@/components/ContentPending';
import EditorialButton from '@/components/EditorialButton';
import HeadshotGallery from '@/components/HeadshotGallery';
import SectionHeading from '@/components/SectionHeading';
import { headshots } from '@/content/media';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Headshots',
  description: 'Theatrical and commercial headshots for Bryan Mittelstadt.',
  path: '/headshots',
});

export default function HeadshotsPage() {
  const hasHeadshots = headshots.length > 0;
  const hasZip = Boolean(siteConfig.headshotsZipUrl);

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
          <div>
            <SectionHeading as="h1" eyebrow="Casting Gallery">
              Headshots
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary">
              Approved theatrical and commercial images will be available for full-screen review and casting downloads.
            </p>
          </div>

          <EditorialButton
            href={siteConfig.headshotsZipUrl}
            variant="secondary"
            download
            disabled={!hasZip}
            title={!hasZip ? 'Headshot download package has not been supplied yet' : undefined}
            className="hidden sm:inline-flex"
          >
            {hasZip ? 'Download Casting ZIP' : 'Casting ZIP Pending'}
          </EditorialButton>
        </div>

        {hasHeadshots ? (
          <HeadshotGallery headshots={headshots} />
        ) : (
          <ContentPending
            title="Original headshots are required"
            description="The gallery workflow is complete, but it will remain unpublished until Bryan supplies and approves the final images. Placeholder graphics are never shown as headshots."
            items={[
              'High-resolution theatrical headshots',
              'High-resolution commercial headshots',
              'Approved labels, alt text, and display order',
              'Optional original-file downloads and casting ZIP package',
            ]}
          />
        )}

        <div className="mt-12 text-center sm:hidden">
          <EditorialButton
            href={siteConfig.headshotsZipUrl}
            variant="secondary"
            download
            disabled={!hasZip}
          >
            {hasZip ? 'Download Casting ZIP' : 'Casting ZIP Pending'}
          </EditorialButton>
        </div>
      </Container>
    </div>
  );
}
