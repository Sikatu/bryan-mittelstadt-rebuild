import fs from 'node:fs';
import path from 'node:path';
import {
  getLaunchInventory,
  root,
} from './lib/release-utils.mjs';

const errors = [];
const requiredFiles = [
  '.env.example',
  'deployment.config.json',
  'src/lib/deployment.ts',
  'scripts/report-launch-readiness.mjs',
  'scripts/prepare-release.mjs',
  'scripts/smoke-remote.mjs',
  'ops/Prepare-Staging.ps1',
  'ops/Prepare-Production.ps1',
  'ops/Invoke-RemoteSmoke.ps1',
  'ops/New-RollbackBranch.ps1',
  'ops/New-ReleaseTag.ps1',
  'docs/DEPLOYMENT-RUNBOOK.md',
  'docs/ROLLBACK-RUNBOOK.md',
  'docs/DNS-CUTOVER-CHECKLIST.md',
  'docs/CLIENT-REVIEW-CHECKLIST.md',
];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`Missing Phase 7 file: ${relativePath}`);
  }
}

const inventory = getLaunchInventory();
const config = inventory.config;

if (config.schemaVersion !== 1) errors.push('Unsupported deployment config schema.');
if (!Array.isArray(config.allowedProviders) || config.allowedProviders.length < 3) {
  errors.push('deployment.config.json must define supported providers.');
}
if (!config.allowedProviders.includes(config.provider)) {
  errors.push('Configured deployment provider is not allowed.');
}
if (config.productionOrigin !== 'https://www.bryanmittelstadt.com') {
  errors.push('Canonical production origin changed unexpectedly.');
}
if (config.environments?.staging?.indexable !== false) {
  errors.push('Staging must remain non-indexable.');
}
if (config.environments?.production?.indexable !== true) {
  errors.push('Production must be indexable.');
}

const envExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
for (const variable of [
  'NEXT_PUBLIC_SITE_ENV',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_CONTACT_FORM_ENDPOINT',
  'DEPLOYMENT_PROVIDER',
  'REMOTE_SMOKE_URL',
]) {
  if (!envExample.includes(variable)) errors.push(`.env.example is missing ${variable}.`);
}

const packageJson = inventory.packageJson;
for (const script of [
  'audit:deployment',
  'launch:report',
  'release:staging',
  'release:production',
  'qa:remote',
]) {
  if (!packageJson.scripts?.[script]) errors.push(`package.json is missing ${script}.`);
}

const deploymentSource = fs.readFileSync(
  path.join(root, 'src/lib/deployment.ts'),
  'utf8',
);
for (const marker of [
  'NEXT_PUBLIC_SITE_ENV',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_CONTACT_FORM_ENDPOINT',
  'isSearchIndexingAllowed',
]) {
  if (!deploymentSource.includes(marker)) errors.push(`Deployment runtime is missing ${marker}.`);
}

const layout = fs.readFileSync(path.join(root, 'src/app/layout.tsx'), 'utf8');
const robots = fs.readFileSync(path.join(root, 'src/app/robots.ts'), 'utf8');
if (!layout.includes('isSearchIndexingAllowed')) {
  errors.push('Root metadata does not respond to deployment indexing policy.');
}
if (!robots.includes('isSearchIndexingAllowed')) {
  errors.push('robots.ts does not respond to deployment indexing policy.');
}

console.log('\nBryan Mittelstadt Phase 7 deployment readiness audit');
console.log('======================================================');
console.log(`Deployment provider: ${config.provider}`);
console.log(`Production origin: ${config.productionOrigin}`);
console.log(`Staging origin configured: ${config.stagingOrigin ? 'yes' : 'no'}`);
console.log(`Published approvals pending: ${inventory.approvalItems.length}`);
console.log(`Hard client-content blockers: ${inventory.hardContentBlockers.length}`);
console.log(`Missing client files: ${inventory.missingClientFiles.length}`);
console.log('Staging indexing: disabled');
console.log('Production indexing: enabled');
console.log('Rollback strategy: branch and redeploy');

if (errors.length > 0) {
  console.error('\nDeployment readiness failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nDeployment architecture and launch-control integrity checks passed.');
