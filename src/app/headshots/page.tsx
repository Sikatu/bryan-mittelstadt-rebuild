import Image from 'next/image';
import Container from '@/components/Container';
import ContentPending from '@/components/ContentPending';
import EditorialButton from '@/components/EditorialButton';
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
          <SectionHeading as="h1" eyebrow="Gallery">
            Headshots
          </SectionHeading>

          <EditorialButton
            href={siteConfig.headshotsZipUrl}
            variant="secondary"
            download
            disabled={!hasZip}
            title={!hasZip ? 'Headshot download package has not been supplied yet' : undefined}
            className="hidden sm:inline-flex"
          >
            {hasZip ? 'Download All (ZIP)' : 'Downloads Pending'}
          </EditorialButton>
        </div>

        {hasHeadshots ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            {headshots.map((photo) => (
              <figure key={photo.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-bg-light">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                {photo.downloadUrl && (
                  <a
                    href={photo.downloadUrl}
                    download
                    className="mt-3 inline-flex text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors hover:text-accent"
                  >
                    Download original
                  </a>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <ContentPending
            title="Original headshots are required"
            description="The placeholder project graphics have been removed from this gallery. The live gallery will only show Bryan's approved theatrical and commercial headshots."
            items={[
              'High-resolution theatrical headshots',
              'High-resolution commercial headshots',
              'Approved alt text or naming order',
              'Optional ZIP package for casting downloads',
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
            {hasZip ? 'Download All Headshots' : 'Downloads Pending'}
          </EditorialButton>
        </div>
      </Container>
    </div>
  );
}
