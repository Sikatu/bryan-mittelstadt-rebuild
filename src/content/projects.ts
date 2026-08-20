// ============================================================
// Bryan Mittelstadt — Projects
// Public claims are traceable through src/content/content-verification.json.
// ============================================================

import { disciplineImageAssets, projectImageAssets } from '@/content/assets';
import type { DisciplineInfo, Project } from '@/types';

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
    image: projectImageAssets.overviewEffect,
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
    image: projectImageAssets.quietAfterSupper,
    verificationId: 'project.quiet-after-supper',
  },
  {
    title: 'Darling',
    discipline: 'Music',
    format: 'Music',
    status: 'Upcoming',
    description:
      'Bryan is preparing upcoming single releases. Final album timing, release dates, and streaming destinations will be announced when confirmed.',
    featured: true,
    image: projectImageAssets.darling,
    verificationId: 'project.darling',
  },
];

export const selectedProjects: Project[] = [
  {
    title: 'Julius',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    productionCompany: 'Sunhour Films',
    accolades: ['Torino Film Festival'],
    image: projectImageAssets.julius,
    verificationId: 'project.julius',
  },
  {
    title: 'Blood and Sex Over Ambition',
    role: 'Lead — Van Gogh',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Greg Kasunich',
    accolades: ['Slamdance', 'Cannes'],
    image: projectImageAssets.bloodAndSexOverAmbition,
    verificationId: 'project.blood-and-sex-over-ambition',
  },
  {
    title: 'Goldilocks and the Two Bears',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Jeff Lipsky',
    accolades: ['Sundance-nominated director'],
    image: projectImageAssets.goldilocks,
    verificationId: 'project.goldilocks-and-the-two-bears',
  },
  {
    title: 'Give',
    role: 'Lead',
    discipline: 'Acting',
    format: 'Short Film',
    director: 'Kenya Gillespie',
    accolades: ['Catalina', 'Aesthetica', 'deadCenter', 'Cannes'],
    image: projectImageAssets.give,
    verificationId: 'project.give',
  },
  {
    title: 'The Last Five Years',
    role: 'Jamie',
    discipline: 'Acting',
    format: 'Stage',
    director: 'Josh Shaw',
    productionCompany: 'Sierra Madre Playhouse',
    image: projectImageAssets.lastFiveYears,
    verificationId: 'project.last-five-years',
  },
  {
    title: 'Arabesque',
    role: 'Lead — Van Gogh',
    discipline: 'Acting',
    format: 'Feature Film',
    director: 'Pan Luo',
    image: projectImageAssets.arabesque,
    verificationId: 'project.arabesque',
  },
];

export const disciplines: DisciplineInfo[] = [
  {
    title: 'Acting',
    slug: '/acting',
    description:
      'Film, television, and stage work spanning independent features, network television, and regional theatre.',
    image: disciplineImageAssets.acting,
    verificationId: 'disciplines.editorial-copy',
  },
  {
    title: 'Voice-Over',
    slug: '/voice-over',
    description:
      'Commercial, dramatic narration, and radio drama. Voice-over representation by Eris Talent Agency.',
    image: disciplineImageAssets.voiceOver,
    verificationId: 'disciplines.editorial-copy',
  },
  {
    title: 'Music',
    slug: '/music',
    description:
      'Tenor vocalist, songwriter, and multi-instrumentalist preparing upcoming single releases.',
    image: disciplineImageAssets.music,
    verificationId: 'disciplines.editorial-copy',
  },
  {
    title: 'Writing & Filmmaking',
    slug: '/writing-filmmaking',
    description:
      'Original screenwriting and directing work including The Sea Ranch, Carne, Dry, What Remains, and Bubble Gum.',
    image: disciplineImageAssets.writing,
    verificationId: 'disciplines.editorial-copy',
  },
];
