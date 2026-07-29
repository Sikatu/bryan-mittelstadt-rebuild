// ============================================================
// Bryan Mittelstadt — Navigation Configuration
// ============================================================

import type { NavItem, UtilityAction } from '@/types';

/** Primary site navigation links. */
export const mainNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Acting', href: '/acting' },
  { label: 'Voice-Over', href: '/voice-over' },
  { label: 'Music', href: '/music' },
  { label: 'Writing & Filmmaking', href: '/writing-filmmaking' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Utility actions shown alongside the nav (desktop) or at the bottom of mobile menu. */
export const utilityActions: UtilityAction[] = [
  {
    label: 'Watch Reel',
    // Links to the #reel section on the homepage until a standalone reel page exists
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
  { label: 'Acting', href: '/acting' },
  { label: 'Voice-Over', href: '/voice-over' },
  { label: 'Music', href: '/music' },
  { label: 'About', href: '/about' },
  { label: 'Headshots', href: '/headshots' },
  { label: 'Contact', href: '/contact' },
];
