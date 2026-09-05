import Container from '@/components/Container';
import HeadshotGallery from '@/components/HeadshotGallery';
import SectionHeading from '@/components/SectionHeading';
import { headshots } from '@/content/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Casting Gallery',
  description:
    'Casting and editorial photography for Bryan Mittelstadt, with downloadable original files.',
  path: '/headshots',
});

export default function HeadshotsPage() {
  return (
    <div className="min-h-screen pb-20 pt-32 lg:pb-28 lg:pt-40">
      <Container>
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.45fr)] lg:items-end lg:gap-16">
          <SectionHeading as="h1" eyebrow="Professional Photography">
            Casting Gallery
          </SectionHeading>

          <p className="max-w-xl text-base leading-7 text-text-secondary lg:justify-self-end">
            {headshots.length} photographs from Bryan&apos;s complete Drive casting archive. Open any image for a larger view or download the original file.
          </p>
        </div>

        <HeadshotGallery headshots={headshots} />
      </Container>
    </div>
  );
}
