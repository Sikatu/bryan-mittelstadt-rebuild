import type { ResumeSection } from '@/types';

export const resumeHeading = 'Professional Acting Résumé';

export const commercialVoiceOverSummary =
  'Hilton (Rick Famuyiwa), Dominos (Martin Aumund), Govx, Bimzelx, Sierra (Torben Kjelstrup), Clickup, Volkswagen, and more.';

export const resumeSections: ResumeSection[] = [
  {
    title: 'Film',
    verificationId: 'resume.selected-credits',
    items: [
      { title: 'Quiet After Supper* (Idyllwild, Durango)', role: 'Lead', detail: 'Lonely Rider Productions' },
      { title: 'Blood and Sex Over Ambition*', role: 'Lead (Van Gogh)', detail: 'Greg Kasunich (Slamdance, Cannes)' },
      { title: 'The Overview Effect', role: 'Lead (w/Sasheer Zamata)', detail: 'Neil Zumwalde' },
      { title: 'Plump Jack*', role: 'Supporting', detail: 'Martin Guigui – Sunset Pictures' },
      { title: 'Julius* (Torino FF)', role: 'Lead', detail: 'Sunhour Films' },
      { title: 'Goldilocks and the Two Bears', role: 'Lead', detail: 'Jeff Lipsky (Sundance)' },
      { title: 'Gladiators', role: 'Supporting', detail: 'Asylum' },
      { title: 'Give (Catalina, Aesthetica, DeadCenter)', role: 'Lead', detail: 'Kenya Gillespie (Cannes)' },
      { title: 'Arabesque*', role: 'Lead', detail: 'Pan Luo' },
      { title: 'Fiat Lux 5000* (LALIFF)', role: 'Supporting', detail: 'Danito de Balazo (Cannes, American Pavilion)' },
      { title: 'In the Path of Shadows*', role: 'Lead', detail: 'Doose Films' },
      { title: 'The Love Affair', role: 'Lead', detail: 'Paul Hannah' },
      { title: 'It Never Entered My Mind*', role: 'Lead', detail: 'James Cirenza' },
      { title: 'Stitched (Silicon Beach, San Antonio)', role: 'Lead', detail: 'Zachary Goodwin' },
      { title: 'Gemini', role: 'Lead', detail: 'Cody Christian' },
      { title: 'Forevertown', role: 'Supporting', detail: 'Oona Garthwaite' },
      { title: 'Hollywood Horizon', role: 'Lead', detail: 'Spencer King' },
      { title: 'Mission A, Plan B (Hollyshorts)', role: 'Lead/Creator', detail: 'LMNTLstudios' },
      { title: 'Last Warning Shot (5 Best Actor)', role: 'Lead', detail: 'Alicia Buckner' },
      { title: 'Afghan Kush (Austin Comedy FF)', role: 'Lead', detail: 'Brady Canales' },
      { title: 'Lower the Bar', role: 'Supporting', detail: 'Stavis Film' },
    ],
  },
  {
    title: 'Television',
    verificationId: 'resume.selected-credits',
    items: [
      { title: 'Wild West Chronicles', role: 'Co Star', detail: 'Amazon' },
      { title: 'Food That Built America', role: 'Guest Star', detail: 'The History Channel' },
      { title: 'The Gamestop Saga', role: 'Co Star', detail: 'Netflix' },
      { title: 'PMI 602', role: 'Guest Star', detail: 'Discovery+' },
      { title: 'In the Shadows', role: 'Guest Star', detail: 'Amazon' },
    ],
  },
  {
    title: 'Regional Theatre',
    verificationId: 'resume.selected-credits',
    items: [
      { title: 'The Last Five Years', role: 'Jamie', detail: 'Sierra Madre Playhouse, Josh Shaw, Matt Cook' },
      { title: 'The Mystery of Edwin Drood', role: 'John Jasper', detail: 'CT Repertory Theatre, Paul Mullins' },
      { title: 'Jesus Christ Superstar', role: 'Annas', detail: 'Nutmeg Summer Series, Terrence Mann' },
      { title: 'As You Like It', role: 'Oliver', detail: 'CT Repertory Theatre, Paul Mullins' },
      { title: 'Henry IV Parts 1&2', role: 'Worcester', detail: 'CT Repertory Theatre, Madeline Sayet' },
      { title: 'Little Shop of Horrors', role: 'Seymour', detail: 'CT Repertory Theatre, Dexter Singleton' },
      { title: 'The Cherry Orchard', role: 'Trofimov', detail: 'CT Repertory Theatre, John Miller-Stephany' },
      { title: 'Spring Awakening', role: 'Georg', detail: 'The Public (San Antonio), Shannon Ivey' },
      { title: 'Sappony, Always', role: 'Robert', detail: 'Yale Off Broadway Theatre (Staged Reading)' },
    ],
  },
];

export const unionAffiliations = ['SAG', 'AEA'];

export const resumeVerificationIds = {
  unions: 'unions.affiliations',
  training: 'resume.training',
  skills: 'resume.skills',
} as const;

export const trainingAndEducation = [
  {
    credential: 'MFA Acting',
    institution: 'University of Connecticut (2020)',
  },
  {
    credential: 'BA Dramatic Media',
    institution: 'Texas Lutheran University – Shannon Ivey',
  },
  {
    credential: 'BA Communications',
    institution: 'Texas Lutheran University',
  },
  {
    credential: 'Music Minor',
    institution: 'Doug Boyer',
  },
  {
    credential: 'Acting',
    institution:
      'Pat McCorkle C.S.A. | Dale Rose | Tessa Faye | Donna McKenna | Emily Cook | Claire Koonce | Dean Fronk | Jake Warnecke | Skyler Zurn | Becca Burgess | Leo Wolfe',
  },
  {
    credential: 'Musical Theatre / Opera',
    institution: 'Michael Paul, Andrew Byrne, Jasper Grant',
  },
];

export const specialSkills =
  'Music: Tenor, Countertenor, Close harmony, Choral. Instruments: Trumpet, Brass, Harmonica, Guitar (Intermediate). Dance: Ballet/Jazz/Hip-hop/Tap (Basic), Ballroom (Intermediate). Dialects: RP, Cockney, Dublin, American Southern. Combat: Eskrima Kali Arnis, Hand to Hand, Broad Sword, Sword and Dagger, Rapier, Knife. Miscellaneous: Breathwork, Medical Assistant, Alexander Technique, Beard (2 weeks), Licensed Driver, Passport, Soccer, Football, Volleyball, Yoga, Weight Lifting, Pilates, Bouldering, Final Cut Pro, Logic Pro.';
