// ============================================================
// LMNTL STUDIOS — Studio positioning and page content
// ============================================================

export const lmntlStudio = {
  name: 'LMNTL STUDIOS',
  shortName: 'LMNTL',
  eyebrow: 'Creative Development Studio',
  tagline: 'The artist is the fifth element.',
  introduction:
    'LMNTL STUDIOS is a creative development studio for independent artists building work with clarity, intention, and staying power.',
  manifesto: 'Earth grounds the work. Air opens the vision. Fire creates momentum. Water shapes identity. The artist brings them together\u2014and turns possibility into form.',
  founderNote:
    'Founded by multidisciplinary artist Bryan Mittelstadt, LMNTL brings performance, story, music, and production thinking into one focused creative practice.',
} as const;

export const lmntlElements = [
  {
    id: 'earth',
    number: '01',
    name: 'Earth',
    principle: 'Foundation',
    description:
      'The structure beneath the work: practice, positioning, process, and the conditions that allow an artist to build with confidence.',
    accent: '#a3a67a',
    image: '/images/lmntl/earth-mark.png',
  },
  {
    id: 'air',
    number: '02',
    name: 'Air',
    principle: 'Vision',
    description:
      'The perspective that clarifies what the work is becoming—its language, audience, atmosphere, and larger creative possibility.',
    accent: '#c1c1c1',
    image: '/images/lmntl/air-mark.png',
  },
  {
    id: 'fire',
    number: '03',
    name: 'Fire',
    principle: 'Momentum',
    description:
      'The energy that moves an idea into action through decisive development, experimentation, collaboration, and creative courage.',
    accent: '#eb8623',
    image: '/images/lmntl/fire-mark.png',
  },
  {
    id: 'water',
    number: '04',
    name: 'Water',
    principle: 'Identity',
    description:
      'The emotional current of the work: adaptability, authenticity, intuition, and the ability to remain recognizably oneself through change.',
    accent: '#65949f',
    image: '/images/lmntl/water-mark.png',
  },
] as const;

export const lmntlPathways = [
  {
    number: 'I',
    title: 'Artist Development',
    description:
      'Clarify the creative identity, body of work, and next meaningful move without forcing the artist into a generic formula.',
  },
  {
    number: 'II',
    title: 'Story & Concept',
    description:
      'Shape the core idea, language, world, and narrative architecture that make a project coherent and memorable.',
  },
  {
    number: 'III',
    title: 'Performance & Presence',
    description:
      'Develop how the artist communicates, performs, and carries the work across rooms, stages, screens, and public-facing platforms.',
  },
  {
    number: 'IV',
    title: 'Creative Production',
    description:
      'Build an intentional path from concept to execution through scope, sequencing, collaborators, and practical creative direction.',
  },
] as const;
