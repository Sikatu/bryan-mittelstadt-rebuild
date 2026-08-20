import Container from '@/components/Container';
import HeadshotGallery from '@/components/HeadshotGallery';
import SectionHeading from '@/components/SectionHeading';
import { headshots } from '@/content/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Headshots',
  description: 'Theatrical and commercial headshots for Bryan Mittelstadt.',
  path: '/headshots',
});

export default function HeadshotsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <div className="mb-12 lg:mb-16">
          <SectionHeading as="h1" eyebrow="Casting Gallery">
            Headshots
          </SectionHeading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary">
            Bryan&apos;s three final client-supplied images are
            presented here for casting and professional use. Each
            image links to its original high-resolution Drive file.
          </p>
        </div>

        <HeadshotGallery headshots={headshots} />
      </Container>
    </div>
  );
}
