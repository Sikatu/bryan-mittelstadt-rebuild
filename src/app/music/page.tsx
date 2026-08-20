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
  description: 'Original music and upcoming single releases by Bryan Mittelstadt.',
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
                fallbackLabel="Music artwork pending"
              />
            )}
            <div className="absolute inset-0 border border-border-subtle/30" />
          </div>

          <div>
            <SectionHeading as="h1" eyebrow="Music">
              {albumProject?.title || 'Upcoming Releases'}
            </SectionHeading>

            <div className="mt-8 space-y-6 font-sans text-lg leading-relaxed text-text-secondary">
              <p>
                Bryan is preparing upcoming single releases. Final
                release dates and streaming destinations will be
                announced when confirmed.
              </p>
              <p>
                The mailing list is intentionally deferred until
                there is a stronger subscriber offering around future
                releases, classes, or other programs.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <EditorialButton href={inquiryHref} disabled={!inquiryHref} variant="secondary">
                Music Inquiries
              </EditorialButton>
            </div>

            {musicLinks.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4" aria-label="Music release links">
                {musicLinks.map((link) => (
                  <EditorialButton key={link.href} href={link.href} external={link.external} variant="text">
                    {link.label}
                  </EditorialButton>
                ))}
              </div>
            )}
          </div>
        </div>

        {musicSamples.length > 0 && (
          <section className="mt-20 border-t border-border-subtle pt-16 lg:mt-28" aria-labelledby="music-samples-heading">
            <SectionHeading eyebrow="Listen" as="h2">
              Music Samples
            </SectionHeading>
            <div className="mt-10 space-y-6">
              {musicSamples.map((sample) => (
                <AudioReelPlayer key={sample.id} reel={sample} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
