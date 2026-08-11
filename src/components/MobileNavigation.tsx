'use client';

import {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  mainNavItems,
  utilityActions,
  workNavItems,
} from '@/content/navigation';
import { siteConfig } from '@/content/site';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const navRef =
    useRef<HTMLDivElement>(null);
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (
        event.key !== 'Tab' ||
        !navRef.current
      ) {
        return;
      }

      const focusableElements =
        navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      const firstFocusable =
        focusableElements[0];

      const lastFocusable =
        focusableElements[
          focusableElements.length - 1
        ];

      if (event.shiftKey) {
        if (
          document.activeElement ===
          firstFocusable
        ) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else if (
        document.activeElement ===
        lastFocusable
      ) {
        event.preventDefault();
        firstFocusable?.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow =
        'hidden';

      document.addEventListener(
        'keydown',
        handleKeyDown,
      );

      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      );
    };
  }, [isOpen, handleKeyDown]);

  const reelAction = utilityActions.find(
    (action) => action.href === '/#reel',
  );

  const resumeAction = utilityActions.find(
    (action) => action.href === '/resume',
  );

  return (
    <div
      id="mobile-navigation"
      ref={navRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
        isOpen
          ? 'visible opacity-100'
          : 'invisible opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/68 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-[29rem] flex-col overflow-y-auto border-l border-white/10 bg-[#11100e] text-white shadow-[-30px_0_80px_rgba(0,0,0,0.32)] transition-transform duration-500 ease-out-expo ${
          isOpen
            ? 'translate-x-0'
            : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-lg tracking-[0.01em] text-white transition-colors hover:text-[#d39d78]"
          >
            {siteConfig.name}
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 p-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
            aria-label="Close navigation menu"
          >
            Close

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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex-1 px-6 py-7 sm:px-8"
        >
          <div>
            <p className="mb-3 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#d39d78]">
              <span
                aria-hidden="true"
                className="h-px w-6 bg-[#d39d78]/70"
              />
              Work
            </p>

            <ul className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
              {workNavItems.map(
                (item, index) => {
                  const isActive =
                    pathname === item.href;

                  return (
                    <li
                      key={item.href}
                      className="border-b border-white/10 sm:odd:border-r"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex min-h-[4.5rem] items-center gap-3 px-1 py-3"
                        aria-current={
                          isActive
                            ? 'page'
                            : undefined
                        }
                      >
                        <span className="font-serif text-[0.7rem] italic text-[#d39d78]">
                          {String(
                            index + 1,
                          ).padStart(2, '0')}
                        </span>

                        <span
                          className={`font-serif text-[1.08rem] leading-tight transition-colors ${
                            isActive
                              ? 'text-[#e9b48e]'
                              : 'text-white/78 group-hover:text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          <div className="mt-8">
            <p className="mb-3 flex items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#d39d78]">
              <span
                aria-hidden="true"
                className="h-px w-6 bg-[#d39d78]/70"
              />
              Studio &amp; Profile
            </p>

            <ul className="divide-y divide-white/10 border-y border-white/10">
              {mainNavItems.map((item) => {
                const isActive =
                  pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-center justify-between py-3.5"
                      aria-current={
                        isActive
                          ? 'page'
                          : undefined
                      }
                    >
                      <span
                        className={`font-serif text-xl transition-colors ${
                          isActive
                            ? 'text-[#e9b48e]'
                            : 'text-white/78 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-sm text-white/28 transition-transform group-hover:translate-x-1 group-hover:text-[#d39d78]"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="border-t border-white/10 px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {reelAction && (
              <Link
                href={reelAction.href}
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center bg-[#a46642] px-5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#bd7950]"
              >
                {reelAction.label}
              </Link>
            )}

            {resumeAction && (
              <Link
                href={resumeAction.href}
                onClick={onClose}
                className="inline-flex min-h-12 items-center justify-center border border-white/24 px-5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white/82 transition-colors hover:border-[#d39d78] hover:text-white"
              >
                {resumeAction.label}
              </Link>
            )}
          </div>

          <p className="mt-5 text-center text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
            {siteConfig.location}
          </p>
        </div>
      </div>
    </div>
  );
}
