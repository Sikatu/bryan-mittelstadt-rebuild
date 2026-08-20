export type SiteEnvironment = 'development' | 'staging' | 'production';

const DEFAULT_PRODUCTION_ORIGIN = 'https://www.bryanmittelstadt.com';
const DEFAULT_CONTACT_FORM_ENDPOINT = '/api/contact';

const allowedEnvironments = new Set<SiteEnvironment>([
  'development',
  'staging',
  'production',
]);

function normalizeEnvironment(value: string | undefined): SiteEnvironment {
  if (value && allowedEnvironments.has(value as SiteEnvironment)) {
    return value as SiteEnvironment;
  }

  return 'production';
}

function normalizeOrigin(value: string | undefined): string {
  const candidate = value?.trim() || DEFAULT_PRODUCTION_ORIGIN;

  try {
    const url = new URL(candidate);
    return url.origin;
  } catch {
    return DEFAULT_PRODUCTION_ORIGIN;
  }
}

export const deploymentEnvironment = {
  name: normalizeEnvironment(process.env.NEXT_PUBLIC_SITE_ENV),
  siteUrl: normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  contactFormEndpoint:
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ||
    DEFAULT_CONTACT_FORM_ENDPOINT,
};

export const isSearchIndexingAllowed =
  deploymentEnvironment.name === 'production';
