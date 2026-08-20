// ============================================================
// Bryan Mittelstadt — Site Configuration
// Public claims are traceable through src/content/content-verification.json.
// ============================================================

import { deploymentEnvironment } from '@/lib/deployment';
import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Bryan Mittelstadt',
  titles: ['Actor', 'Writer', 'Singer', 'Director'],
  location: 'Los Angeles',

  shortBio:
    'Bryan Mittelstadt is an actor, writer, singer, and director based in Los Angeles. ' +
    'He received the 2026 Durango Independent Film Festival Jury Award for Best Performance ' +
    'by an Actor in a Narrative Feature for Quiet After Supper and is set to lead ' +
    'The Overview Effect, a new musical alongside Sasheer Zamata. His work spans film, ' +
    'television, stage, voice-over, music, writing, and directing.',

  longBio:
    'Bryan is an actor, VO artist, and singer in Los Angeles. ' +
    'He is about to lead The Overview Effect, a new musical alongside Sasheer Zamata ' +
    '(SNL, Agatha All Along). It will be a filmed series as well as be staged at the ' +
    "Disney Hall's Redcat Theatre.\n\n" +
    'He received the 2026 Durango Independent Film Festival Jury Award for Best Performance ' +
    'by an Actor in a Narrative Feature for Quiet After Supper.\n\n' +
    "He also led Julius, which premiered at the Torino Film Festival, led Pan Luo's " +
    "upcoming piece Arabesque as Van Gogh, and appeared in Sundance-nominated director " +
    "Jeff Lipsky's Goldilocks and the Two Bears.\n\n" +
    'Bryan grew up in Texas, where he completed a 75-page thesis on the history and trajectory ' +
    'of film noir, and trained operatically in New York before returning to acting and film. ' +
    'After completing his MFA in Acting in 2020, Bryan moved to Los Angeles and has since ' +
    'worked on films noted at festivals including Torino, SXSW, Aesthetica, and deadCenter. ' +
    'When not in front of the camera, Bryan is developing original writing and directing work, ' +
    'preparing upcoming music releases, playing guitar, or traveling.\n\n' +
    'Bryan is committed to creating a more inclusive artistic environment and is interested in ' +
    'exploring inequalities and social justice issues in overt and subtle ways.',

  seo: {
    siteTitle: 'Bryan Mittelstadt | Actor, Writer, Singer & Director',
    siteDescription:
      'Official website of Bryan Mittelstadt, a Los Angeles actor, writer, singer, and director ' +
      'working across film, television, stage, voice-over, music, writing, and directing.',
    siteUrl: deploymentEnvironment.siteUrl,
    ogImage: '/opengraph-image',
    lastUpdated: '2026-08-20',
  },

  physical: {
    height: "5'11\"",
    weight: '160lbs',
    hair: 'Red',
    eyes: 'Blue',
    voice: 'Tenor',
  },

  resumeUrl: '/downloads/bryan-mittelstadt-resume.pdf',

  email: 'bryanmittelstadt@gmail.com',

  verificationIds: {
    identity: 'identity.name-and-titles',
    location: 'identity.location',
    shortBio: 'bio.short',
    longBio: 'bio.long',
    seo: 'seo.global',
    physical: 'casting.physical',
    reel: 'media.acting-reel',
    resume: 'asset.resume-pdf',
    headshots: 'asset.headshots',
    mailingList: 'integration.mailing-list',
    email: 'contact.direct-email',
    openGraph: 'asset.open-graph',
  },
};
