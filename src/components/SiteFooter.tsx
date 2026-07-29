import Link from 'next/link';
import Container from './Container';
import { footerNavItems } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import { getVerifiedSocialLinks } from '@/content/social';

/** Social icon SVGs — only rendered for verified links. */
function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'IMDb':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M14.31 9.588v4.81h-1.588V9.588h1.588ZM2 7.003h2.497v9.994H2V7.003Zm4.426 0h2.737l.86 5.264.76-5.264h2.667v9.994h-1.836V9.803l-.953 7.194h-1.515l-.968-7.194v7.194H6.426V7.003ZM18.37 7.003h2.478c.39 0 .93.04 1.252.166.324.126.57.314.742.564.172.25.29.52.342.812.056.296.084.782.084 1.46v4.028c0 .652-.04 1.106-.12 1.4-.076.29-.232.548-.464.782-.232.234-.504.382-.82.456-.316.074-.87.112-1.228.112H18.37V7.003Zm1.64 1.736v6.522h.604c.328 0 .556-.036.658-.108.106-.072.172-.184.202-.336.028-.152.044-.508.044-1.068V9.698c0-.622-.016-.996-.046-1.14a.451.451 0 0 0-.214-.316c-.108-.068-.33-.103-.632-.103h-.616Z"/>
        </svg>
      );
    case 'Instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case 'YouTube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function SiteFooter() {
  const verifiedSocial = getVerifiedSocialLinks();

  return (
    <footer role="contentinfo" className="bg-contrast-dark text-contrast-light">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Identity */}
            <div>
              <Link
                href="/"
                className="font-serif text-xl text-contrast-light tracking-wide hover:text-accent transition-colors duration-300"
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

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-contrast-light/60 mb-4">
                Explore
              </h2>
              <ul className="space-y-2">
                {footerNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-contrast-light/80 hover:text-contrast-light transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect */}
            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-contrast-light/60 mb-4">
                Connect
              </h2>
              <Link
                href="/contact"
                className="text-sm text-accent hover:text-accent-hover transition-colors duration-300 underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
              >
                Contact &amp; Representation
              </Link>

              {verifiedSocial.length > 0 && (
                <div className="mt-5 flex gap-4">
                  {verifiedSocial.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-contrast-light/80 hover:text-contrast-light transition-colors duration-300"
                      aria-label={link.label}
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-contrast-light/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-contrast-light/60">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
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
