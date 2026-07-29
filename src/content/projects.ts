// ============================================================
// Bryan Mittelstadt — Projects
// All data confirmed from the public website and resume PDF.
// ============================================================

import type { Project, DisciplineInfo } from '@/types';

// ---- CURRENT / FEATURED PROJECTS ----

export const featuredProjects: Project[] = [
  {
    title: 'The Overview Effect',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    status: 'Upcoming',
    description:
      'A new musical alongside Sasheer Zamata (SNL, Agatha All Along), to be filmed as a series and staged at Disney Hall\'s Redcat Theatre.',
    director: 'Neil Zumwalde',
    featured: true,
    image: '/images/placeholders/project-1.svg',
  },
  {
    title: 'Quiet After Supper',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    status: 'Released',
    description:
      'Feature film for which Bryan won Best Actor at the 21st Annual Durango Film Festival.',
    productionCompany: 'Lonely Rider Productions',
    accolades: ['Best Actor — Durango Film Festival', 'Idyllwild Film Festival'],
    featured: true,
    image: '/images/placeholders/project-2.svg',
  },
  {
    title: 'Darling',
    discipline: 'Music',
    format: 'Music',
    status: 'Upcoming',
    year: 2026,
    description:
      "Bryan's debut folk album, releasing in 2026.",
    featured: true,
    image: '/images/placeholders/project-3.svg',
  },
];

// ---- SELECTED WORK ----

export const selectedProjects: Project[] = [
  {
    title: 'Julius',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    productionCompany: 'Sunhour Films',
    accolades: ['Torino Film Festival'],
    image: '/images/placeholders/project-4.svg',
  },
  {
    title: 'Blood and Sex Over Ambition',
    role: 'Lead — Van Gogh',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Greg Kasunich',
    accolades: ['Slamdance', 'Cannes'],
    image: '/images/placeholders/project-5.svg',
  },
  {
    title: 'Goldilocks and the Two Bears',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Jeff Lipsky',
    accolades: ['Sundance-nominated director'],
    image: '/images/placeholders/project-6.svg',
  },
  {
    title: 'Give',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Short Film',
    director: 'Kenya Gillespie',
    accolades: ['Catalina', 'Aesthetica', 'deadCenter', 'Cannes'],
    image: '/images/placeholders/project-7.svg',
  },
  {
    title: 'The Last Five Years',
    role: 'Jamie',
    discipline: 'Acting',
    format: 'Stage',
    director: 'Josh Shaw',
    productionCompany: 'Sierra Madre Playhouse',
    image: '/images/placeholders/project-8.svg',
  },
  {
    title: 'Arabesque',
    role: 'Lead — Van Gogh',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Pan Luo',
    image: '/images/placeholders/project-9.svg',
  },
];

// ---- DISCIPLINE INTRODUCTIONS ----

export const disciplines: DisciplineInfo[] = [
  {
    title: 'Acting',
    slug: '/acting',
    description:
      'Film, television, and stage. From independent features at Torino and Slamdance to network television and regional theatre.',
    image: '/images/placeholders/discipline-acting.svg',
  },
  {
    title: 'Voice-Over',
    slug: '/voice-over',
    description:
      'Commercial, dramatic narration, and radio drama. Represented by Eris Talent Agency.',
    image: '/images/placeholders/discipline-vo.svg',
  },
  {
    title: 'Music',
    slug: '/music',
    description:
      'Tenor vocalist, songwriter, and multi-instrumentalist. Debut folk album Darling releasing 2026.',
    image: '/images/placeholders/discipline-music.svg',
  },
  {
    title: 'Writing & Filmmaking',
    slug: '/writing-filmmaking',
    description:
      'Screenwriting, directing, and producing independent film. A storyteller across every medium.',
    image: '/images/placeholders/discipline-writing.svg',
  },
];
