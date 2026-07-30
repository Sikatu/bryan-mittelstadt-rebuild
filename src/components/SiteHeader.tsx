'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavItems, utilityActions } from '@/content/navigation';
import { siteConfig } from '@/content/site';
import Container from './Container';
import MobileNavigation from './MobileNavigation';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const [mobileMenuState, setMobileMenuState] = useState({
    open: false,
    pathname,
  });
  const mobileMenuOpen =
    mobileMenuState.open && mobileMenuState.pathname === pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMobileMenu = () =>
    setMobileMenuState({ open: true, pathname });
  const closeMobileMenu = () => {
    setMobileMenuState({ open: false, pathname });
    window.requestAnimationFrame(() => mobileMenuButtonRef.current?.focus());
  };

  const isHome = pathname === '/';
  const useLightText = isHome && !scrolled;

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-primary/95 backdrop-blur-sm shadow-sm shadow-border-subtle/30 border-b border-border-subtle text-text-primary'
            : 'bg-transparent border-b border-transparent ' + (useLightText ? 'text-contrast-light' : 'text-text-primary')
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo / Name */}
            <Link
              href="/"
              className={`font-serif text-lg lg:text-xl tracking-wide transition-colors duration-300 ${
                useLightText ? 'text-contrast-light hover:text-accent' : 'text-text-primary hover:text-accent'
              }`}
              aria-label={`${siteConfig.name} — Home`}
            >
              {siteConfig.name}
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-1"
            >
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-sans tracking-wide transition-colors duration-300 ${
                      useLightText
                        ? isActive
                          ? 'text-contrast-light font-medium'
                          : 'text-contrast-light/80 hover:text-contrast-light'
                        : isActive
                        ? 'text-text-primary font-medium'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Utility Actions */}
              <div className="ml-4 flex items-center gap-3">
                {utilityActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`text-xs font-medium uppercase tracking-widest px-4 py-2 transition-all duration-300 ${
                      action.variant === 'primary'
                        ? 'bg-accent text-contrast-light hover:bg-accent-hover'
                        : useLightText
                        ? 'border border-contrast-light/25 text-contrast-light hover:border-accent hover:text-accent'
                        : 'border border-border-subtle text-text-secondary hover:border-accent hover:text-accent'
                    }`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className={`lg:hidden p-2 transition-colors ${
                useLightText ? 'text-contrast-light/80 hover:text-contrast-light' : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={openMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}
