import Image from 'next/image';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import EditorialButton from '@/components/EditorialButton';
import { featuredProjects } from '@/content/projects';
import { musicLinks } from '@/content/media';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Music',
  description: 'Original folk music and vocal performances by Bryan Mittelstadt.',
  path: '/music',
});

export default function MusicPage() {
  const albumProject = featuredProjects.find(p => p.discipline === 'Music');

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Cover Art */}
          <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none bg-bg-light shadow-2xl shadow-contrast-dark/5">
            {albumProject?.image && (
              <Image
                src={albumProject.image}
                alt="Darling Album Cover"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 border border-border-subtle/30" />
          </div>

          {/* Details */}
          <div>
            <SectionHeading as="h1" eyebrow="Upcoming Release">
              {albumProject?.title || 'Darling'}
            </SectionHeading>
            
            <div className="mt-8 space-y-6 text-text-secondary leading-relaxed font-sans text-lg">
              <p>
                {albumProject?.description || "Bryan's debut folk album, releasing in 2026."}
              </p>
              <p>
                Combining acoustic storytelling with rich vocal harmonies, the album draws from his roots in Texas and operatic training in New York. 
              </p>
            </div>

            <div className="mt-12">
              <EditorialButton
                href={siteConfig.mailingListUrl}
                external
                variant="primary"
                disabled={!siteConfig.mailingListUrl}
                title={!siteConfig.mailingListUrl ? 'Mailing-list destination has not been supplied yet' : undefined}
              >
                {siteConfig.mailingListUrl ? 'Join Mailing List' : 'Mailing List Coming Soon'}
              </EditorialButton>
              <p className="mt-4 text-xs text-text-muted tracking-wide uppercase">
                {siteConfig.mailingListUrl
                  ? 'Be the first to hear when Darling drops.'
                  : 'Signup will open after the approved mailing-list link is connected.'}
              </p>

              {musicLinks.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {musicLinks.map((link) => (
                    <EditorialButton
                      key={link.href}
                      href={link.href}
                      external={link.external}
                      variant="secondary"
                    >
                      {link.label}
                    </EditorialButton>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
