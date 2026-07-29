// ============================================================
// Bryan Mittelstadt — Site Type Definitions
// ============================================================

/** Evidence status assigned to a public claim, configuration value, or asset. */
export type VerificationStatus =
  | 'verified-primary'
  | 'confirmed-public'
  | 'client-review-required'
  | 'client-approved'
  | 'pending'
  | 'intentionally-omitted';

/** Whether a tracked item is currently visible on the public website. */
export type PublicationState = 'published' | 'withheld' | 'placeholder';

/** A source used to substantiate content in the rebuild. */
export interface ContentSource {
  id: string;
  label: string;
  kind: string;
  url?: string;
  path?: string;
  accessedOn?: string;
  capturedOn?: string;
  status?: 'pending';
}

/** One auditable public claim, configuration item, integration, or asset. */
export interface ContentVerificationRecord {
  id: string;
  area: string;
  label: string;
  status: VerificationStatus;
  publication: PublicationState;
  sourceIds: string[];
  ownerAction?: string;
}

/** Machine-readable source and approval ledger used by Phase 2 audits. */
export interface ContentVerificationManifest {
  version: number;
  updatedOn: string;
  statusDefinitions: Record<VerificationStatus, string>;
  sources: ContentSource[];
  records: ContentVerificationRecord[];
}

/** A navigation link used in the header, footer, or mobile menu. */
export interface NavItem {
  label: string;
  href: string;
  /** If true, the link opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

/** A utility action displayed alongside the main navigation (e.g. "Watch Reel"). */
export interface UtilityAction {
  label: string;
  href: string;
  external?: boolean;
  /** Visual variant for the button. */
  variant: 'primary' | 'secondary' | 'text';
}

/** A social media or professional profile link. */
export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  /** URL is confirmed and can be displayed publicly. */
  verified: boolean;
  verificationId?: string;
}

/** A credential, award, union membership, or notable achievement. */
export interface Credential {
  label: string;
  /** More specific detail (e.g. award year or category). */
  detail?: string;
  /** If true, this credential has been publicly confirmed. */
  verified: boolean;
  verificationId?: string;
}

/** A professional representative (agency). */
export interface Representation {
  type: 'theatrical' | 'commercial' | 'voiceover' | 'literary';
  agencyName: string;
  /** Only include if confirmed — never invent. */
  agentName?: string;
  phone?: string;
  email?: string;
  website?: string;
  verificationId?: string;
}

/** A project (film, TV, stage, music, writing). */
export interface Project {
  title: string;
  role?: string;
  discipline: Discipline;
  format?: 'Feature Film' | 'Short Film' | 'Television' | 'Commercial' | 'Stage' | 'Musical' | 'Music' | 'Web Series' | 'Voice-Over';
  status?: 'Completed' | 'In Production' | 'Post-Production' | 'Upcoming' | 'Released';
  year?: number | string;
  director?: string;
  productionCompany?: string;
  description?: string;
  /** Festival selections, awards, or other recognition. */
  accolades?: string[];
  image?: string;
  link?: string;
  /** If true, display as a featured/current project. */
  featured?: boolean;
  verificationId?: string;
}

/** The creative disciplines Bryan works across. */
export type Discipline =
  | 'Acting'
  | 'Voice-Over'
  | 'Music'
  | 'Writing & Filmmaking'
  | 'Singing'
  | 'Producing';

/** A discipline introduction card for the homepage. */
export interface DisciplineInfo {
  title: string;
  slug: string;
  description: string;
  image?: string;
  verificationId?: string;
}

/** A row in the HTML résumé. */
export interface ResumeItem {
  title: string;
  role: string;
  detail?: string;
}

/** A grouped section in the HTML résumé. */
export interface ResumeSection {
  title: string;
  items: ResumeItem[];
  verificationId?: string;
}

/** Centralized public-facing image paths. */
export interface SiteAssets {
  heroImage: string;
  reelPosterImage: string;
  portraitImage: string;
  verificationId?: string;
}

/** A voice-over reel or externally hosted audio sample. */
export interface AudioReel {
  title: string;
  type: string;
  audioUrl?: string;
  verificationId?: string;
}

/** A supplied headshot and optional downloadable original. */
export interface Headshot {
  id: string;
  src: string;
  alt: string;
  downloadUrl?: string;
  verificationId?: string;
}

/** A verified external resource such as a streaming or mailing-list link. */
export interface ResourceLink {
  label: string;
  href: string;
  external?: boolean;
  verificationId?: string;
}

/** Verification references for scalar site configuration fields. */
export interface SiteVerificationMap {
  identity: string;
  location: string;
  shortBio: string;
  longBio: string;
  seo: string;
  physical: string;
  reel: string;
  resume: string;
  headshots: string;
  mailingList: string;
  email: string;
}

/** Global site configuration. */
export interface SiteConfig {
  name: string;
  titles: string[];
  location: string;
  shortBio: string;
  longBio: string;
  seo: {
    siteTitle: string;
    siteDescription: string;
    siteUrl: string;
    ogImage?: string;
  };
  physical?: {
    height: string;
    weight: string;
    hair: string;
    eyes: string;
    voice: string;
  };
  reelUrl?: string;
  reelYear?: string;
  reelUploadDate?: string;
  resumeUrl?: string;
  headshotsZipUrl?: string;
  mailingListUrl?: string;
  email?: string;
  verificationIds: SiteVerificationMap;
}
