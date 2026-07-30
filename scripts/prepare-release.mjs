import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  allowedEnvironments,
  getLaunchInventory,
  getRepositoryState,
  parseArguments,
  resolveDeploymentSettings,
  root,
  writeJson,
} from './lib/release-utils.mjs';

const args = parseArguments();
const environment = String(args.environment || '');

if (!['staging', 'production'].includes(environment) || !allowedEnvironments.has(environment)) {
  console.error('Release preparation requires --environment=staging or --environment=production.');
  process.exit(1);
}

const inventory = getLaunchInventory();
const repository = getRepositoryState();
const deployment = resolveDeploymentSettings(environment, inventory.config);

if (inventory.config.release.requireCleanWorkingTree && repository.status) {
  console.error('Release preparation requires a clean Git working tree.');
  console.error(repository.status);
  process.exit(1);
}

function run(command, commandArgs, env = process.env) {
  const executable =
    command === 'npm' && process.platform === 'win32' ? 'npm.cmd' : command;
  const result = spawnSync(executable, commandArgs, {
    cwd: root,
    env,
    stdio: 'inherit',
    shell: false,
  });

  if (result.status !== 0) process.exit(result.status ?? 1);
}

const releaseEnv = {
  ...process.env,
  NEXT_PUBLIC_SITE_ENV: environment,
  NEXT_PUBLIC_SITE_URL: deployment.origin,
  DEPLOYMENT_PROVIDER: deployment.provider,
};

run(process.execPath, [
  'scripts/report-launch-readiness.mjs',
  `--environment=${environment}`,
  '--strict',
], releaseEnv);

run('npm', ['run', 'qa'], releaseEnv);

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const releaseDirectory = path.join(root, '.release', `${environment}-${stamp}`);
fs.mkdirSync(releaseDirectory, { recursive: true });

const manifest = {
  schemaVersion: 1,
  preparedAt: new Date().toISOString(),
  environment,
  deployment,
  repository,
  package: {
    name: inventory.packageJson.name,
    version: inventory.packageJson.version,
    node: process.version,
    next: inventory.packageJson.dependencies.next,
    react: inventory.packageJson.dependencies.react,
  },
  checks: [
    'eslint',
    'typescript',
    'phase-1-through-7-audits',
    'production-build',
    'local-production-smoke-test',
    'strict-launch-readiness',
  ],
  remoteSmokeCommand: `npm run qa:remote -- --environment=${environment} --url=${deployment.origin}`,
  rollbackStrategy: inventory.config.rollback.strategy,
};

const manifestPath = writeJson(
  path.relative(root, path.join(releaseDirectory, 'release-manifest.json')),
  manifest,
);

const currentTag = `${inventory.config.release.tagPrefix}${environment}-${stamp}`;
fs.writeFileSync(
  path.join(releaseDirectory, 'release-tag.txt'),
  `${currentTag}\n`,
);

console.log('\nBryan Mittelstadt release package prepared');
console.log('===========================================');
console.log(`Environment: ${environment}`);
console.log(`Provider: ${deployment.provider}`);
console.log(`Origin: ${deployment.origin}`);
console.log(`Commit: ${repository.shortCommit}`);
console.log(`Release manifest: ${path.relative(root, manifestPath)}`);
console.log(`Suggested release tag: ${currentTag}`);
console.log('\nNo hosting-provider deployment was executed. Follow docs/DEPLOYMENT-RUNBOOK.md.');
