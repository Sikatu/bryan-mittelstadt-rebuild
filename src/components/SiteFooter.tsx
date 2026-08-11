import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import { footerNavItems } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { getVerifiedSocialLinks } from '@/content/social';

const footerSocialMarks = [
  {
    platform: 'Instagram',
    image: '/images/brand-marks/instagram.webp',
    width: 375,
    height: 360,
    className: 'minimal-footer-social__logo--instagram',
  },
  {
    platform: 'YouTube',
    image: '/images/brand-marks/youtube.webp',
    width: 509,
    height: 360,
    className: 'minimal-footer-social__logo--youtube',
  },
  {
    platform: 'IMDb',
    image: '/images/brand-marks/imdb.webp',
    width: 720,
    height: 358,
    className: 'minimal-footer-social__logo--imdb',
  },
] as const;

export default function SiteFooter() {
  const verifiedSocial = getVerifiedSocialLinks();

  const orderedFooterSocial = footerSocialMarks.flatMap(
    (mark) => {
      const socialLink = verifiedSocial.find(
        (link) => link.platform === mark.platform,
      );

      return socialLink
        ? [
            {
              ...mark,
              url: socialLink.url,
              label: socialLink.label,
            },
          ]
        : [];
    },
  );

  return (
    <footer
      role="contentinfo"
      className="premium-site-footer bg-contrast-dark text-contrast-light"
    >
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
            <div>
              <Link
                href="/"
                className="font-serif text-xl tracking-wide text-contrast-light transition-colors duration-300 hover:text-accent"
              >
                {siteConfig.name}
              </Link>

              <p className="mt-2 text-sm text-contrast-light/80">
                {siteConfig.titles.join(', ')}
              </p>

              <p className="mt-1 text-sm text-contrast-light/60">
                {siteConfig.location}
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-contrast-light/60">
                Explore
              </h2>

              <ul className="space-y-2">
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-contrast-light/80 transition-colors duration-300 hover:text-contrast-light"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-contrast-light/60">
                Connect
              </h2>

              <Link
                href="/contact"
                className="text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-300 hover:text-accent-hover hover:decoration-accent"
              >
                Contact &amp; Representation
              </Link>

              {orderedFooterSocial.length > 0 && (
                <div
                  className="minimal-footer-social mt-6"
                  aria-label="Bryan Mittelstadt social and industry profiles"
                >
                  {orderedFooterSocial.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="minimal-footer-social__link"
                      aria-label={link.label}
                      title={link.platform}
                    >
                      <Image
                        src={link.image}
                        alt=""
                        width={link.width}
                        height={link.height}
                        sizes="96px"
                        className={`minimal-footer-social__logo ${link.className}`}
                      />

                      <span className="sr-only">
                        {link.platform}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-contrast-light/10 pt-6 sm:flex-row">
            <p className="text-xs text-contrast-light/60">
              &copy; {new Date().getFullYear()}{' '}
              {siteConfig.name}. All rights reserved.
            </p>

            <p className="text-xs text-contrast-light/40">
              {siteConfig.location}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
