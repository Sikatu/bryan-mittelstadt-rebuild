import path from 'node:path';
import {
  allowedEnvironments,
  getLaunchInventory,
  getRepositoryState,
  isSecurePublicOrigin,
  parseArguments,
  resolveDeploymentSettings,
  root,
  writeJson,
  writeText,
} from './lib/release-utils.mjs';

const args = parseArguments();
const environment = String(args.environment || 'development');
const strict = args.strict === true || args.strict === 'true';

if (!allowedEnvironments.has(environment)) {
  console.error(`Unknown deployment environment: ${environment}`);
  process.exit(1);
}

const inventory = getLaunchInventory();
const repository = getRepositoryState();
const deployment = resolveDeploymentSettings(environment, inventory.config);
const configurationBlockers = [];
const warnings = [];

if (environment !== 'development') {
  if (!inventory.config.allowedProviders.includes(deployment.provider)) {
    configurationBlockers.push(
      `Deployment provider must be one of: ${inventory.config.allowedProviders.join(', ')}.`,
    );
  }

  if (deployment.provider === 'unselected') {
    configurationBlockers.push('Deployment provider is still unselected.');
  }

  if (!isSecurePublicOrigin(deployment.origin)) {
    configurationBlockers.push(
      `${environment} requires a real HTTPS NEXT_PUBLIC_SITE_URL.`,
    );
  }
}

if (environment === 'production') {
  if (deployment.origin !== inventory.config.productionOrigin) {
    configurationBlockers.push(
      `Production origin must be ${inventory.config.productionOrigin}.`,
    );
  }

  if (inventory.approvalItems.length > 0) {
    warnings.push(
      `${inventory.approvalItems.length} published items still require Bryan's approval.`,
    );
  }
}

if (environment === 'staging') {
  warnings.push(
    'Staging is intentionally non-indexable and may contain pending client content.',
  );
}

const productionBlockers = [
  ...configurationBlockers,
  ...inventory.hardContentBlockers.map(
    (record) => `${record.id}: ${record.ownerAction}`,
  ),
  ...inventory.approvalItems.map(
    (record) => `${record.id}: ${record.ownerAction}`,
  ),
  ...inventory.missingClientFiles.map((file) => `Missing client file: ${file}`),
];

const stagingBlockers = [...configurationBlockers];
const activeBlockers =
  environment === 'production'
    ? productionBlockers
    : environment === 'staging'
      ? stagingBlockers
      : [];

const report = {
  generatedAt: new Date().toISOString(),
  environment,
  strict,
  repository,
  deployment,
  summary: {
    verificationRecords: inventory.verification.records.length,
    publishedItemsAwaitingApproval: inventory.approvalItems.length,
    withheldOrPendingContent: inventory.hardContentBlockers.length,
    missingClientFiles: inventory.missingClientFiles.length,
    pendingImageSlots: inventory.pendingImageSlots,
    pendingMediaSlots: inventory.pendingMediaSlots,
    configurationBlockers: configurationBlockers.length,
    activeBlockers: activeBlockers.length,
  },
  approvalItems: inventory.approvalItems,
  hardContentBlockers: inventory.hardContentBlockers,
  missingClientFiles: inventory.missingClientFiles,
  configurationBlockers,
  activeBlockers,
  warnings,
  ready: activeBlockers.length === 0,
};

const reportBase = `.launch/launch-readiness-${environment}`;
const jsonPath = writeJson(`${reportBase}.json`, report);
const markdown = [
  `# Bryan Mittelstadt Launch Readiness — ${environment}`,
  '',
  `Generated: ${report.generatedAt}`,
  `Commit: ${repository.shortCommit}`,
  `Branch: ${repository.branch}`,
  `Provider: ${deployment.provider}`,
  `Origin: ${deployment.origin || 'not configured'}`,
  '',
  `## Status: ${report.ready ? 'READY' : 'BLOCKED'}`,
  '',
  '## Summary',
  '',
  `- Published items awaiting approval: ${report.summary.publishedItemsAwaitingApproval}`,
  `- Withheld or pending content: ${report.summary.withheldOrPendingContent}`,
  `- Missing client files: ${report.summary.missingClientFiles}`,
  `- Pending image slots: ${report.summary.pendingImageSlots}`,
  `- Pending media slots: ${report.summary.pendingMediaSlots}`,
  `- Configuration blockers: ${report.summary.configurationBlockers}`,
  '',
  '## Active Blockers',
  '',
  ...(activeBlockers.length > 0
    ? activeBlockers.map((blocker) => `- ${blocker}`)
    : ['- None']),
  '',
  '## Warnings',
  '',
  ...(warnings.length > 0 ? warnings.map((warning) => `- ${warning}`) : ['- None']),
  '',
  '## Client Approval Queue',
  '',
  ...inventory.approvalItems.map(
    (record) => `- **${record.id}** — ${record.ownerAction}`,
  ),
  '',
  '## Pending Client Deliveries',
  '',
  ...inventory.hardContentBlockers.map(
    (record) => `- **${record.id}** — ${record.ownerAction}`,
  ),
  ...inventory.missingClientFiles.map((file) => `- **File:** ${file}`),
  '',
].join('\n');
const markdownPath = writeText(`${reportBase}.md`, markdown);

console.log('\nBryan Mittelstadt Phase 7 launch readiness report');
console.log('===================================================');
console.log(`Environment: ${environment}`);
console.log(`Provider: ${deployment.provider}`);
console.log(`Origin: ${deployment.origin || 'not configured'}`);
console.log(`Published approvals pending: ${inventory.approvalItems.length}`);
console.log(`Withheld/pending content: ${inventory.hardContentBlockers.length}`);
console.log(`Missing client files: ${inventory.missingClientFiles.length}`);
console.log(`Pending image slots: ${inventory.pendingImageSlots}`);
console.log(`Pending media slots: ${inventory.pendingMediaSlots}`);
console.log(`Active blockers for ${environment}: ${activeBlockers.length}`);
console.log(`JSON report: ${path.relative(root, jsonPath)}`);
console.log(`Markdown report: ${path.relative(root, markdownPath)}`);

if (activeBlockers.length > 0) {
  console.log('\nActive blockers:');
  for (const blocker of activeBlockers) console.log(`- ${blocker}`);
}

if (strict && activeBlockers.length > 0) {
  process.exit(1);
}
