'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  mainNavItems,
  utilityActions,
  workNavItems,
} from '@/content/navigation';
import { siteConfig } from '@/content/site';
import Container from './Container';
import MobileNavigation from './MobileNavigation';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuButtonRef =
    useRef<HTMLButtonElement>(null);
  const workMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [workMenuState, setWorkMenuState] =
    useState({
      open: false,
      pathname,
    });

  const workMenuOpen =
    workMenuState.open &&
    workMenuState.pathname === pathname;

  const [mobileMenuState, setMobileMenuState] =
    useState({
      open: false,
      pathname,
    });

  const mobileMenuOpen =
    mobileMenuState.open &&
    mobileMenuState.pathname === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    const handlePointerDown = (
      event: MouseEvent,
    ) => {
      if (
        workMenuRef.current &&
        !workMenuRef.current.contains(
          event.target as Node,
        )
      ) {
        setWorkMenuState((current) => ({
          ...current,
          open: false,
        }));
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === 'Escape') {
        setWorkMenuState((current) => ({
          ...current,
          open: false,
        }));
      }
    };

    document.addEventListener(
      'mousedown',
      handlePointerDown,
    );

    document.addEventListener(
      'keydown',
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handlePointerDown,
      );

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, []);

  const openMobileMenu = () => {
    setWorkMenuState((current) => ({
          ...current,
          open: false,
        }));

    setMobileMenuState({
      open: true,
      pathname,
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuState({
      open: false,
      pathname,
    });

    window.requestAnimationFrame(() => {
      mobileMenuButtonRef.current?.focus();
    });
  };

  const isHome = pathname === '/';
  const isLmntlStudios =
    pathname === '/lmntl-studios';

  const useLightText =
    isLmntlStudios ||
    (isHome && !scrolled);

  const workIsActive = workNavItems.some(
    (item) => item.href === pathname,
  );

  const reelAction = utilityActions.find(
    (action) => action.href === '/#reel',
  );

  const resumeAction = utilityActions.find(
    (action) => action.href === '/resume',
  );

  const primaryTextClass = useLightText
    ? 'text-contrast-light/76 hover:text-contrast-light'
    : 'text-text-secondary hover:text-text-primary';

  const activeTextClass = useLightText
    ? 'text-contrast-light'
    : 'text-text-primary';

  return (
    <>
      <header
        role="banner"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? isLmntlStudios
              ? 'border-white/10 bg-[#0b0b0a]/92 text-contrast-light shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl'
              : 'border-border-subtle/80 bg-bg-primary/92 text-text-primary shadow-[0_12px_34px_rgba(30,24,19,0.06)] backdrop-blur-xl'
            : `border-transparent bg-transparent ${
                useLightText
                  ? 'text-contrast-light'
                  : 'text-text-primary'
              }`
        }`}
      >
        <Container>
          <div className="flex h-[3.75rem] items-center justify-between lg:h-[4.15rem]">
            <Link
              href="/"
              className={`group inline-flex min-w-0 items-baseline gap-3 transition-colors duration-300 ${
                useLightText
                  ? 'text-contrast-light hover:text-accent'
                  : 'text-text-primary hover:text-accent'
              }`}
              aria-label={`${siteConfig.name} — Home`}
            >
              <span className="truncate font-serif text-[1.05rem] tracking-[0.005em] lg:text-[1.12rem]">
                {siteConfig.name}
              </span>

              <span
                aria-hidden="true"
                className={`hidden h-px w-5 transition-all duration-300 group-hover:w-8 xl:block ${
                  useLightText
                    ? 'bg-white/38'
                    : 'bg-text-secondary/35'
                }`}
              />
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden items-center lg:flex"
            >
              <div
                ref={workMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => {
                    setWorkMenuState(
                      (current) => ({
                        open: !(
                          current.open &&
                          current.pathname ===
                            pathname
                        ),
                        pathname,
                      }),
                    );
                  }}
                  className={`group relative inline-flex items-center gap-1.5 px-2.5 py-2 text-[0.78rem] font-medium tracking-[0.035em] transition-colors duration-300 ${
                    workIsActive
                      ? activeTextClass
                      : primaryTextClass
                  }`}
                  aria-expanded={workMenuOpen}
                  aria-controls="desktop-work-menu"
                  aria-haspopup="true"
                >
                  Work

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                      workMenuOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>

                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300 ${
                      workIsActive ||
                      workMenuOpen
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    } ${
                      useLightText
                        ? 'bg-white/75'
                        : 'bg-accent'
                    }`}
                  />
                </button>

                <div
                  id="desktop-work-menu"
                  className={`absolute left-1/2 top-[calc(100%+0.8rem)] w-[31rem] -translate-x-1/2 transition-all duration-300 ${
                    workMenuOpen
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-2 opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!workMenuOpen}
                >
                  <div className="overflow-hidden border border-[#d8cec2] bg-[#fbf8f3]/98 shadow-[0_28px_70px_rgba(24,19,15,0.18)] backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-[#ded6cc] px-5 py-3">
                      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#9a5d3a]">
                        Selected Work
                      </span>

                      <span className="text-[0.58rem] uppercase tracking-[0.16em] text-[#8b8178]">
                        Portfolio
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-px bg-[#ded6cc]">
                      {workNavItems.map(
                        (item, index) => {
                          const isActive =
                            pathname === item.href;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="group flex min-h-[5.6rem] items-start gap-3 bg-[#fbf8f3] px-5 py-4 transition-colors duration-300 hover:bg-white focus-visible:bg-white"
                              aria-current={
                                isActive
                                  ? 'page'
                                  : undefined
                              }
                            >
                              <span className="pt-0.5 font-serif text-[0.72rem] italic text-[#a46642]">
                                {String(
                                  index + 1,
                                ).padStart(
                                  2,
                                  '0',
                                )}
                              </span>

                              <span className="min-w-0">
                                <span
                                  className={`block font-serif text-[1.06rem] leading-tight transition-colors duration-300 ${
                                    isActive
                                      ? 'text-[#9a5d3a]'
                                      : 'text-[#28221d] group-hover:text-[#9a5d3a]'
                                  }`}
                                >
                                  {item.label}
                                </span>

                                <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.12em] text-[#8b8178]">
                                  {item.href ===
                                  '/headshots'
                                    ? 'Casting materials'
                                    : 'Creative discipline'}
                                </span>
                              </span>
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {mainNavItems.map((item) => {
                const isActive =
                  pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative px-3 py-2 text-[0.82rem] font-medium tracking-[0.035em] transition-colors duration-300 ${
                      isActive
                        ? activeTextClass
                        : primaryTextClass
                    }`}
                    aria-current={
                      isActive
                        ? 'page'
                        : undefined
                    }
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left transition-transform duration-300 ${
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      } ${
                        useLightText
                          ? 'bg-white/75'
                          : 'bg-accent'
                      }`}
                    />
                  </Link>
                );
              })}

              <span
                aria-hidden="true"
                className={`mx-3 h-5 w-px ${
                  useLightText
                    ? 'bg-white/18'
                    : 'bg-border-subtle'
                }`}
              />

              {resumeAction && (
                <Link
                  href={resumeAction.href}
                  className={`px-2.5 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                    pathname ===
                    resumeAction.href
                      ? activeTextClass
                      : primaryTextClass
                  }`}
                  aria-current={
                    pathname ===
                    resumeAction.href
                      ? 'page'
                      : undefined
                  }
                >
                  {resumeAction.label}
                </Link>
              )}

              {reelAction && (
                <Link
                  href={reelAction.href}
                  className="ml-3 inline-flex min-h-9 items-center justify-center bg-accent px-4 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-contrast-light transition-all duration-300 hover:bg-accent-hover focus-visible:bg-accent-hover"
                >
                  {reelAction.label}
                </Link>
              )}
            </nav>

            <button
              ref={mobileMenuButtonRef}
              type="button"
              className={`inline-flex items-center gap-2 p-2 text-[0.63rem] font-semibold uppercase tracking-[0.16em] transition-colors lg:hidden ${
                useLightText
                  ? 'text-contrast-light/78 hover:text-contrast-light'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={openMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
            >
              Menu

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.35}
                stroke="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7.5h16M4 12h16M4 16.5h16"
                />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}
