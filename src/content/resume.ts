import type { ResumeSection } from '@/types';

/**
 * Selected résumé content currently represented in the HTML page.
 * Reconcile every entry against Bryan's final approved PDF before launch.
 */
export const resumeSections: ResumeSection[] = [
  {
    title: 'Selected Film',
    items: [
      { title: 'Quiet After Supper', role: 'Lead', detail: 'Lonely Rider Prod.' },
      { title: 'Blood and Sex Over Ambition', role: 'Lead (Van Gogh)', detail: 'Dir. Greg Kasunich' },
      { title: 'The Overview Effect', role: 'Lead', detail: 'Dir. Neil Zumwalde' },
      { title: 'Plump Jack', role: 'Supporting', detail: 'Independent' },
      { title: 'Julius', role: 'Lead', detail: 'Sunhour Films' },
      { title: 'Goldilocks and the Two Bears', role: 'Lead', detail: 'Dir. Jeff Lipsky' },
      { title: 'Gladiators', role: 'Lead', detail: 'Independent' },
      { title: 'Give', role: 'Lead', detail: 'Dir. Kenya Gillespie' },
      { title: 'Arabesque', role: 'Lead (Van Gogh)', detail: 'Dir. Pan Luo' },
    ],
  },
  {
    title: 'Selected Television',
    items: [
      { title: 'Wild West Chronicles', role: 'Guest Star', detail: 'INSP' },
      { title: 'Food That Built America', role: 'Co-Star', detail: 'History Channel' },
      { title: 'The Gamestop Saga', role: 'Co-Star', detail: 'Discovery+' },
      { title: 'PMI 602', role: 'Guest Star', detail: 'Web Series' },
    ],
  },
  {
    title: 'Selected Theatre',
    items: [
      { title: 'The Last Five Years', role: 'Jamie', detail: 'Sierra Madre Playhouse' },
      { title: 'The Mystery of Edwin Drood', role: 'John Jasper', detail: 'Regional' },
      { title: 'Jesus Christ Superstar', role: 'Annas', detail: 'Regional' },
      { title: 'As You Like It', role: 'Oliver', detail: 'Regional' },
      { title: 'Henry IV Parts 1&2', role: 'Worcester', detail: 'CRT' },
      { title: 'Little Shop of Horrors', role: 'Seymour', detail: 'Regional' },
    ],
  },
];

export const unionAffiliations = ['SAG-AFTRA', 'AEA'];

export const trainingAndEducation = [
  {
    credential: 'MFA Acting',
    institution: 'University of Connecticut (UConn)',
  },
  {
    credential: 'BA Dramatic Media & BA Communication',
    institution: 'Texas Lutheran University',
  },
  {
    credential: 'Specialized Training',
    institution: 'Acting (Pat McCorkle, Dale Rose), Musical Theatre & Opera (Michael Paul)',
  },
];

export const specialSkills =
  'Vocal: Tenor, Countertenor. Instruments: Trumpet, Guitar. Dance: Ballet, Jazz, Tap, Ballroom. Dialects: RP, Cockney, Dublin, Southern. Other: Stage Combat.';
