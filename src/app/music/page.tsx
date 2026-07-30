import AudioReelPlayer from '@/components/AudioReelPlayer';
import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import EditorialImage from '@/components/EditorialImage';
import SectionHeading from '@/components/SectionHeading';
import { musicLinks, musicSamples } from '@/content/media';
import { featuredProjects } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { createInquiryHref } from '@/lib/media';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Music',
  description: 'Original folk music, vocal performance, and the upcoming album Darling by Bryan Mittelstadt.',
  path: '/music',
});

export default function MusicPage() {
  const albumProject = featuredProjects.find((project) => project.discipline === 'Music');
  const inquiryHref = createInquiryHref(siteConfig.email, 'Music inquiry for Bryan Mittelstadt');

  return (
    <div className="min-h-screen pb-20 pt-32 lg:pb-28 lg:pt-40">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto aspect-square w-full max-w-md bg-bg-light shadow-2xl shadow-contrast-dark/5 lg:max-w-none">
            {albumProject?.image && (
              <EditorialImage
                asset={albumProject.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                fallbackLabel="Album artwork pending"
              />
            )}
            <div className="absolute inset-0 border border-border-subtle/30" />
          </div>

          <div>
            <SectionHeading as="h1" eyebrow="Upcoming Release">
              {albumProject?.title || 'Darling'}
            </SectionHeading>

            <div className="mt-8 space-y-6 font-sans text-lg leading-relaxed text-text-secondary">
              <p>{albumProject?.description || "Bryan's debut folk album, currently planned for release in 2026."}</p>
              <p>
                Final release copy, artwork, date, streaming destinations, and audio samples remain subject to Bryan’s approval.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <EditorialButton
                href={siteConfig.mailingListUrl}
                external
                variant="primary"
                disabled={!siteConfig.mailingListUrl}
                title={!siteConfig.mailingListUrl ? 'Mailing-list destination has not been supplied yet' : undefined}
              >
                {siteConfig.mailingListUrl ? 'Join Mailing List' : 'Mailing List Coming Soon'}
              </EditorialButton>
              <EditorialButton href={inquiryHref} disabled={!inquiryHref} variant="secondary">
                Music Inquiries
              </EditorialButton>
            </div>

            {musicLinks.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-4" aria-label="Music release links">
                {musicLinks.map((link) => (
                  <EditorialButton key={link.href} href={link.href} external={link.external} variant="text">
                    {link.label}
                  </EditorialButton>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-text-muted">
                Streaming, pre-save, purchase, performance, and press links are pending.
              </p>
            )}
          </div>
        </div>

        <section className="mt-20 border-t border-border-subtle pt-16 lg:mt-28" aria-labelledby="music-samples-heading">
          <SectionHeading eyebrow="Listen" as="h2">
            Music Samples
          </SectionHeading>
          {musicSamples.length > 0 ? (
            <div className="mt-10 space-y-6">
              {musicSamples.map((sample) => (
                <AudioReelPlayer key={sample.id} reel={sample} />
              ))}
            </div>
          ) : (
            <div className="mt-8 border border-border-subtle bg-bg-secondary p-7 sm:p-9">
              <h3 id="music-samples-heading" className="font-serif text-2xl text-text-primary">Approved audio is being prepared</h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">
                This player area supports direct audio files and approved hosted links. It remains noninteractive until Bryan authorizes public samples.
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
