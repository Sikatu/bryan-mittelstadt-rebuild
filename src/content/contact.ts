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

/**
 * Phase 4 ships with a direct-email workflow. Add a verified HTTPS endpoint
 * only after the production form provider, spam policy, and delivery path are approved.
 */
export const contactFormConfig: ContactFormConfig = {
  endpoint: deploymentEnvironment.contactFormEndpoint,
  categories: inquiryCategories,
  minimumMessageLength: 20,
  privacyNote:
    'This website does not store inquiry details when the direct-email workflow is used. Your email application handles the message.',
};
