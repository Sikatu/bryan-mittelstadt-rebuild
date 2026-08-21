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
      className="premium-site-footer border-t border-white/8 bg-[#11100f] text-contrast-light"
    >
      <Container>
        <div className="py-10 sm:py-12 lg:py-14">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(10rem,0.55fr)_minmax(12rem,0.6fr)] md:gap-12 lg:gap-16">
            <div>
              <Link
                href="/"
                className="font-serif text-[1.55rem] tracking-[-0.02em] text-contrast-light transition-colors duration-300 hover:text-accent"
              >
                {siteConfig.name}
              </Link>

              <p className="mt-3 max-w-sm text-[0.78rem] uppercase leading-6 tracking-[0.12em] text-contrast-light/56">
                {siteConfig.titles.join(' · ')}
              </p>

              <p className="mt-2 text-xs text-contrast-light/38">
                {siteConfig.location}
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h2 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-contrast-light/38">
                Explore
              </h2>

              <ul className="space-y-2">
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.82rem] text-contrast-light/66 transition-colors duration-300 hover:text-contrast-light"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.22em] text-contrast-light/38">
                Connect
              </h2>

              <Link
                href="/contact"
                className="text-[0.82rem] text-[#d39d78] underline decoration-[#d39d78]/30 underline-offset-4 transition-colors duration-300 hover:text-[#efc3a8]"
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

          <div className="mt-9 flex flex-col justify-between gap-3 border-t border-contrast-light/8 pt-5 sm:flex-row sm:items-center">
            <p className="text-[10px] text-contrast-light/38">
              &copy; {new Date().getFullYear()}{' '}
              {siteConfig.name}. All rights reserved.
            </p>

            <p className="text-[9px] uppercase tracking-[0.18em] text-contrast-light/28">
              {siteConfig.location}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
