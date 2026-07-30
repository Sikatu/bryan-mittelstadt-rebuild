export type SiteEnvironment = 'development' | 'staging' | 'production';

const DEFAULT_PRODUCTION_ORIGIN = 'https://www.bryanmittelstadt.com';
const allowedEnvironments = new Set<SiteEnvironment>([
  'development',
  'staging',
  'production',
]);

function normalizeEnvironment(value: string | undefined): SiteEnvironment {
  if (value && allowedEnvironments.has(value as SiteEnvironment)) {
    return value as SiteEnvironment;
  }

  // Preserve the existing production-canonical behavior unless an explicit
  // staging or development environment is supplied at build time.
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
    process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || undefined,
};

export const isSearchIndexingAllowed =
  deploymentEnvironment.name === 'production';
