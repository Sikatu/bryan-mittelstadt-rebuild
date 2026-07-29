// ============================================================
// Bryan Mittelstadt — Projects
// Public claims are traceable through src/content/content-verification.json.
// ============================================================

import type { DisciplineInfo, Project } from '@/types';

// ---- CURRENT / FEATURED PROJECTS ----

export const featuredProjects: Project[] = [
  {
    title: 'The Overview Effect',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Musical',
    status: 'Upcoming',
    description:
      "A new musical alongside Sasheer Zamata (SNL, Agatha All Along), planned as a filmed series and a stage production at Disney Hall's REDCAT.",
    director: 'Neil Zumwalde',
    featured: true,
    image: '/images/placeholders/project-1.svg',
    verificationId: 'project.the-overview-effect',
  },
  {
    title: 'Quiet After Supper',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    status: 'Released',
    description:
      'A psychological thriller featuring Bryan as Tristan Weathers. His performance received the 2026 Durango Independent Film Festival Jury Award for Best Performance by an Actor in a Narrative Feature.',
    productionCompany: 'Lonely Rider Productions',
    accolades: [
      '2026 Durango Jury Award — Best Performance Actor, Narrative Feature',
    ],
    featured: true,
    image: '/images/placeholders/project-2.svg',
    verificationId: 'project.quiet-after-supper',
  },
  {
    title: 'Darling',
    discipline: 'Music',
    format: 'Music',
    status: 'Upcoming',
    year: 2026,
    description: "Bryan's debut folk album, currently planned for release in 2026.",
    featured: true,
    image: '/images/placeholders/project-3.svg',
    verificationId: 'project.darling',
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
    verificationId: 'project.julius',
  },
  {
    title: 'Blood and Sex Over Ambition',
    role: 'Lead — Van Gogh',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Greg Kasunich',
    accolades: ['Slamdance', 'Cannes'],
    image: '/images/placeholders/project-5.svg',
    verificationId: 'project.blood-and-sex-over-ambition',
  },
  {
    title: 'Goldilocks and the Two Bears',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Jeff Lipsky',
    accolades: ['Sundance-nominated director'],
    image: '/images/placeholders/project-6.svg',
    verificationId: 'project.goldilocks-and-the-two-bears',
  },
  {
    title: 'Give',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Short Film',
    director: 'Kenya Gillespie',
    accolades: ['Catalina', 'Aesthetica', 'deadCenter', 'Cannes'],
    image: '/images/placeholders/project-7.svg',
    verificationId: 'project.give',
  },
  {
    title: 'The Last Five Years',
    role: 'Jamie',
    discipline: 'Acting',
    format: 'Stage',
    director: 'Josh Shaw',
    productionCompany: 'Sierra Madre Playhouse',
    image: '/images/placeholders/project-8.svg',
    verificationId: 'project.last-five-years',
  },
  {
    title: 'Arabesque',
    role: 'Lead — Van Gogh',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Pan Luo',
    image: '/images/placeholders/project-9.svg',
    verificationId: 'project.arabesque',
  },
];

// ---- DISCIPLINE INTRODUCTIONS ----

export const disciplines: DisciplineInfo[] = [
  {
    title: 'Acting',
    slug: '/acting',
    description:
      'Film, television, and stage work spanning independent features, network television, and regional theatre.',
    image: '/images/placeholders/discipline-acting.svg',
    verificationId: 'disciplines.editorial-copy',
  },
  {
    title: 'Voice-Over',
    slug: '/voice-over',
    description:
      'Commercial, dramatic narration, and radio drama. Voice-over representation by Eris Talent Agency.',
    image: '/images/placeholders/discipline-vo.svg',
    verificationId: 'disciplines.editorial-copy',
  },
  {
    title: 'Music',
    slug: '/music',
    description:
      'Tenor vocalist, songwriter, and multi-instrumentalist preparing his debut folk album, Darling.',
    image: '/images/placeholders/discipline-music.svg',
    verificationId: 'disciplines.editorial-copy',
  },
  {
    title: 'Writing & Filmmaking',
    slug: '/writing-filmmaking',
    description:
      'Screenwriting, directing, and producing work to be added after Bryan approves the public project list.',
    image: '/images/placeholders/discipline-writing.svg',
    verificationId: 'disciplines.editorial-copy',
  },
];
