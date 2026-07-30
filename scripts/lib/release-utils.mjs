import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const root = process.cwd();
export const allowedEnvironments = new Set([
  'development',
  'staging',
  'production',
]);

export function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

export function parseArguments(argv = process.argv.slice(2)) {
  const result = {};

  for (const argument of argv) {
    if (!argument.startsWith('--')) continue;
    const [rawKey, ...valueParts] = argument.slice(2).split('=');
    result[rawKey] = valueParts.length > 0 ? valueParts.join('=') : true;
  }

  return result;
}

export function normalizeOrigin(value) {
  if (!value) return '';

  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return '';
  }
}

export function isSecurePublicOrigin(value) {
  const origin = normalizeOrigin(value);
  return origin.startsWith('https://') && !origin.includes('example.com');
}

export function gitOutput(args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

export function getRepositoryState() {
  return {
    branch: gitOutput(['branch', '--show-current']),
    commit: gitOutput(['rev-parse', 'HEAD']),
    shortCommit: gitOutput(['rev-parse', '--short', 'HEAD']),
    status: gitOutput(['status', '--porcelain']),
  };
}

export function getLaunchInventory() {
  const verification = readJson('src/content/content-verification.json');
  const config = readJson('deployment.config.json');
  const packageJson = readJson('package.json');
  const assetsSource = fs.readFileSync(
    path.join(root, 'src/content/assets.ts'),
    'utf8',
  );
  const mediaSource = fs.readFileSync(
    path.join(root, 'src/content/media.ts'),
    'utf8',
  );

  const approvalItems = verification.records.filter(
    (record) => record.status === 'client-review-required',
  );
  const hardContentBlockers = verification.records.filter(
    (record) =>
      record.status === 'pending' &&
      (record.publication === 'withheld' ||
        record.publication === 'placeholder'),
  );
  const missingClientFiles = [
    'public/bryan-mittelstadt-resume.pdf',
  ].filter((file) => !fs.existsSync(path.join(root, file)));

  return {
    verification,
    config,
    packageJson,
    approvalItems,
    hardContentBlockers,
    missingClientFiles,
    pendingImageSlots: Math.max(
      0,
      (assetsSource.match(/pendingAsset\(/g) ?? []).length - 1,
    ),
    pendingMediaSlots:
      (mediaSource.match(/availability:\s*'pending'/g) ?? []).length,
  };
}

export function resolveDeploymentSettings(environment, config) {
  const provider =
    process.env.DEPLOYMENT_PROVIDER?.trim() || config.provider || 'unselected';
  const configuredOrigin =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (environment === 'production'
      ? config.productionOrigin
      : environment === 'staging'
        ? config.stagingOrigin
        : 'http://localhost:3000');

  return {
    environment,
    provider,
    origin: normalizeOrigin(configuredOrigin),
    contactFormEndpoint:
      process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || '',
  };
}

export function ensureDirectory(relativePath) {
  const directory = path.join(root, relativePath);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

export function writeJson(relativePath, value) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, `${JSON.stringify(value, null, 2)}\n`);
  return fullPath;
}

export function writeText(relativePath, value) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, value);
  return fullPath;
}
