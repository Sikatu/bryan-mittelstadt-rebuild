// ============================================================
// Bryan Mittelstadt — Site Configuration
// All content sourced from publicly visible information at
// bryanmittelstadt.com. Items marked TODO require verification.
// ============================================================

import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Bryan Mittelstadt',
  titles: ['Actor', 'Writer', 'Singer', 'Producer'],
  location: 'Los Angeles',

  shortBio:
    'Bryan Mittelstadt is an actor, writer, singer, and producer based in Los Angeles. ' +
    'He recently won Best Actor at the 21st Annual Durango Film Festival for the feature ' +
    'Quiet After Supper and is set to lead The Overview Effect, a new musical alongside ' +
    'Sasheer Zamata. His work spans film, television, stage, voice-over, music, and ' +
    'independent filmmaking, with selections at Torino, SXSW, Slamdance, and festivals worldwide.',

  longBio:
    'Bryan is an actor, VO artist, and singer in Los Angeles. ' +
    'He is about to lead The Overview Effect, a new musical alongside Sasheer Zamata ' +
    '(SNL, Agatha All Along). It will be a filmed series as well as be staged at the ' +
    "Disney Hall's Redcat Theatre.\n\n" +
    'He just won Best Actor at the 21st Annual Durango Film Festival for the feature, ' +
    'Quiet After Supper.\n\n' +
    "He also led Julius, which premiered at the esteemed Torino Film Festival, led acclaimed director " +
    "Pan Luo's upcoming piece, Arabesque, as Van Gogh and Sundance-nominated director Jeff Lipsky's " +
    'Goldilocks and the Two Bears.\n\n' +
    'Bryan grew up in Texas where he completed his 75-page thesis on the history and trajectory ' +
    'of film noir, trained operatically in New York until finally returning to his love of acting ' +
    'and film. After completing his MFA in Acting in 2020, Bryan moved to Los Angeles and has since ' +
    'worked on dozens of films, many noted in Rio, Sehsuechte, Mumbai, Aesthetica, deadCenter, ' +
    'Torino, SXSW, and more. When not in front of the camera, Bryan is completing his upcoming ' +
    'folk album and scripts, playing guitar, or traveling.\n\n' +
    'Bryan is committed to creating a more inclusive artistic environment and is interested in ' +
    'exploring inequalities and social justice issues in overt and subtle ways.',

  seo: {
    siteTitle: 'Bryan Mittelstadt | Actor, Writer, Singer & Producer',
    siteDescription:
      'Official website of Bryan Mittelstadt, a Los Angeles actor, writer, singer, and producer ' +
      'working across film, television, stage, voice-over, music, and independent filmmaking.',
    // TODO: Update with final production domain
    siteUrl: 'https://www.bryanmittelstadt.com',
    // Add '/images/og-default.jpg' after the final 1200×630 image is supplied.
    ogImage: undefined,
  },

  physical: {
    height: "5'11\"",
    weight: '160 lbs',
    hair: 'Red',
    eyes: 'Blue',
    voice: 'Tenor',
  },

  // TODO: Bryan to provide the YouTube video ID for the dramatic reel
  reelUrl: undefined,
  reelYear: '2026',

  // TODO: Host résumé PDF locally in /public and update this path
  resumeUrl: undefined,

  // Confirmed from the contact page
  email: 'bryanmittelstadt@gmail.com',
};
