import AudioReelPlayer from '@/components/AudioReelPlayer';
import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import SectionHeading from '@/components/SectionHeading';
import { voiceOverReels } from '@/content/media';
import { representation } from '@/content/representation';
import { siteConfig } from '@/content/site';
import { createInquiryHref } from '@/lib/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Voice-Over',
  description: 'Commercial, narration, character, and radio-drama voice-over reels by Bryan Mittelstadt.',
  path: '/voice-over',
});

export default function VoiceOverPage() {
  const voiceOverRepresentation = representation.find((item) => item.type === 'voiceover');
  const inquiryHref = createInquiryHref(siteConfig.email, 'Voice-over inquiry for Bryan Mittelstadt');
  const hasAvailableAudio = voiceOverReels.some((reel) => reel.availability === 'available' && reel.audioUrl);

  return (
    <div className="min-h-screen pb-20 pt-32 lg:pb-28 lg:pt-40">
      <Container narrow>
        <SectionHeading as="h1" eyebrow="Voice-Over">
          Audio Reels
        </SectionHeading>

        <div className="mb-12 mt-8 max-w-2xl">
          <p className="body-text text-text-secondary">
            Commercial, narration, character, and radio-drama categories with accessible direct-audio playback and safe hosted-media fallbacks.
          </p>
        </div>

        <div className="space-y-6">
          {voiceOverReels.map((reel) => (
            <AudioReelPlayer key={reel.id} reel={reel} />
          ))}
        </div>

        {!hasAvailableAudio && (
          <p className="mt-6 text-sm text-text-muted" role="status">
            Playback will activate after Bryan supplies approved direct audio files or hosting links.
          </p>
        )}

        <section className="mt-14 border-t border-border-subtle pt-10" aria-labelledby="voiceover-contact-heading">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">Representation & Booking</p>
          <h2 id="voiceover-contact-heading" className="mt-3 font-serif text-2xl text-text-primary">
            Voice-over inquiries
          </h2>
          <p className="mt-4 max-w-xl text-text-secondary">
            {voiceOverRepresentation
              ? `Voice-over representation is listed with ${voiceOverRepresentation.agencyName}. Direct agent details remain private until Bryan approves them for publication.`
              : 'Verified representation details will be added after client approval.'}
          </p>
          <EditorialButton href={inquiryHref} disabled={!inquiryHref} variant="primary" className="mt-6">
            Send Voice-Over Inquiry
          </EditorialButton>
        </section>
      </Container>
    </div>
  );
}
