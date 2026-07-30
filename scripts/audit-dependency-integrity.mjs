import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packagePath = path.join(root, 'package.json');
const lockPath = path.join(root, 'package-lock.json');

const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
const errors = [];

function parseVersion(value) {
  const match = String(value ?? '').match(/^(?:\^|~)?(\d+)\.(\d+)\.(\d+)$/);
  return match ? match.slice(1).map(Number) : null;
}

function atLeast(value, minimum) {
  const parsed = parseVersion(value);
  const target = parseVersion(minimum);
  if (!parsed || !target) return false;
  for (let index = 0; index < 3; index += 1) {
    if (parsed[index] > target[index]) return true;
    if (parsed[index] < target[index]) return false;
  }
  return true;
}

const nextVersion = pkg.dependencies?.next;
const reactVersion = pkg.dependencies?.react;
const reactDomVersion = pkg.dependencies?.['react-dom'];
const eslintNextVersion = pkg.devDependencies?.['eslint-config-next'];
const rootLock = lock.packages?.[''];
const installedNext = lock.packages?.['node_modules/next']?.version;

if (!atLeast(nextVersion, '16.2.11') || parseVersion(nextVersion)?.[0] !== 16) {
  errors.push(`Next.js must remain on the supported 16.2 security line or newer within major 16; found ${nextVersion}.`);
}

if (nextVersion !== eslintNextVersion) {
  errors.push(`next (${nextVersion}) and eslint-config-next (${eslintNextVersion}) must use the same exact version.`);
}

if (reactVersion !== reactDomVersion) {
  errors.push(`react (${reactVersion}) and react-dom (${reactDomVersion}) must match.`);
}

if (!atLeast(reactVersion, '19.2.4')) {
  errors.push(`React must remain at 19.2.4 or newer; found ${reactVersion}.`);
}

if (rootLock?.dependencies?.next !== nextVersion) {
  errors.push('package-lock.json root Next.js version does not match package.json.');
}

if (rootLock?.devDependencies?.['eslint-config-next'] !== eslintNextVersion) {
  errors.push('package-lock.json root eslint-config-next version does not match package.json.');
}

if (installedNext !== nextVersion) {
  errors.push(`Locked Next.js package (${installedNext}) does not match package.json (${nextVersion}).`);
}

if (pkg.engines?.node !== '>=20.9.0') {
  errors.push('package.json must declare Node.js >=20.9.0 for Next.js 16.');
}

const scriptValues = Object.values(pkg.scripts ?? {}).join('\n');
if (/audit\s+fix\s+--force/i.test(scriptValues)) {
  errors.push('Project scripts must never automate npm audit fix --force.');
}

console.log('\nBryan Mittelstadt Phase 6 dependency integrity audit');
console.log('======================================================');
console.log(`Next.js: ${nextVersion}`);
console.log(`React: ${reactVersion}`);
console.log(`React DOM: ${reactDomVersion}`);
console.log(`ESLint Config Next: ${eslintNextVersion}`);
console.log(`Node engine: ${pkg.engines?.node ?? 'not configured'}`);
console.log(`Lockfile version: ${lock.lockfileVersion}`);

if (errors.length > 0) {
  console.error('\nDependency integrity failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nDependency manifest and lockfile integrity checks passed.');
