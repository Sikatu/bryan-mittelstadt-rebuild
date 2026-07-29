import Container from './Container';
import SectionHeading from './SectionHeading';
import VideoReelGallery from './VideoReelGallery';
import { actingReels } from '@/content/media';

/** Homepage reel feature. The full categorized reel library lives on /acting. */
export default function ReelPlayer() {
  const featuredReel = actingReels.find((reel) => reel.availability === 'available') ?? actingReels[0];

  if (!featuredReel) return null;

  return (
    <section id="reel" aria-label="Acting reel" className="py-20 lg:py-28">
      <Container>
        <div className="mb-10 lg:mb-14">
          <SectionHeading eyebrow="Featured Reel" align="center">
            Acting Reel
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-text-secondary">
            Selected performance work across film, television, commercial, musical, and stage categories.
          </p>
        </div>
        <VideoReelGallery reels={[featuredReel]} showSelector={false} />
      </Container>
    </section>
  );
}
