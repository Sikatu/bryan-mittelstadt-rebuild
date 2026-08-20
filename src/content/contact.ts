import { deploymentEnvironment } from '@/lib/deployment';
import type { ContactFormConfig, InquiryCategory } from '@/types';

export const inquiryCategories: InquiryCategory[] = [
  {
    id: 'acting',
    label: 'Acting & Casting',
    subjectPrefix: 'Acting inquiry',
    description: 'Film, television, theatre, commercial, and casting inquiries.',
  },
  {
    id: 'voice-over',
    label: 'Voice-Over',
    subjectPrefix: 'Voice-over inquiry',
    description: 'Commercial, narration, character, radio drama, and audio work.',
  },
  {
    id: 'music',
    label: 'Music',
    subjectPrefix: 'Music inquiry',
    description: 'Performance, recording, collaboration, and press inquiries.',
  },
  {
    id: 'writing-filmmaking',
    label: 'Writing & Filmmaking',
    subjectPrefix: 'Creative project inquiry',
    description: 'Writing, directing, producing, and independent-film collaborations.',
  },
  {
    id: 'lmntl-studios',
    label: 'LMNTL Studios',
    subjectPrefix: 'LMNTL Studios inquiry',
    description: 'Artist development, creative direction, story, and multidisciplinary studio inquiries.',
  },
  {
    id: 'press',
    label: 'Press & Media',
    subjectPrefix: 'Press inquiry',
    description: 'Interview, festival, publication, and media requests.',
  },
  {
    id: 'general',
    label: 'General',
    subjectPrefix: 'Website inquiry',
    description: 'All other professional inquiries.',
  },
];

export const contactFormVerificationId = 'integration.contact-form' as const;

export const contactFormConfig: ContactFormConfig = {
  endpoint: deploymentEnvironment.contactFormEndpoint,
  categories: inquiryCategories,
  minimumMessageLength: 20,
  privacyNote:
    'This website does not persist inquiry content. The configured email provider processes delivery to Bryan.',
};
