// ============================================================
// Bryan Mittelstadt — Streamlined Navigation Configuration
// ============================================================

import type {
  NavItem,
  UtilityAction,
} from '@/types';

/**
 * Creative disciplines grouped under the desktop and mobile
 * Work navigation.
 */
export const workNavItems: NavItem[] = [
  {
    label: 'Acting',
    href: '/acting',
  },
  {
    label: 'Voice-Over',
    href: '/voice-over',
  },
  {
    label: 'Music',
    href: '/music',
  },
  {
    label: 'Writing & Filmmaking',
    href: '/writing-filmmaking',
  },
  {
    label: 'Headshots',
    href: '/headshots',
  },
];

/**
 * High-level destinations kept visible in the primary navbar.
 * Home is intentionally represented by the Bryan Mittelstadt
 * wordmark instead of a redundant text link.
 */
export const mainNavItems: NavItem[] = [
  {
    label: 'LMNTL',
    href: '/lmntl-studios',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

/** Utility actions displayed beside the primary navigation. */
export const utilityActions: UtilityAction[] = [
  {
    label: 'Watch Reel',
    href: '/#reel',
    variant: 'primary',
  },
  {
    label: 'Résumé',
    href: '/resume',
    variant: 'secondary',
  },
];

/** Footer navigation — a curated subset. */
export const footerNavItems: NavItem[] = [
  {
    label: 'Acting',
    href: '/acting',
  },
  {
    label: 'Voice-Over',
    href: '/voice-over',
  },
  {
    label: 'Music',
    href: '/music',
  },
  {
    label: 'LMNTL Studios',
    href: '/lmntl-studios',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Headshots',
    href: '/headshots',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
