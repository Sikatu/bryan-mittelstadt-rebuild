import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const manifestPath = join(root, 'src/content/content-verification.json');

const allowedStatuses = new Set([
  'verified-primary',
  'confirmed-public',
  'client-review-required',
  'client-approved',
  'pending',
  'intentionally-omitted',
]);

const allowedPublicationStates = new Set([
  'published',
  'withheld',
  'placeholder',
]);

function fail(errors, message) {
  errors.push(message);
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const fullPath = join(directory, name);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

if (!existsSync(manifestPath)) {
  console.error('Content verification manifest is missing.');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const errors = [];

if (manifest.version !== 1) {
  fail(errors, `Unsupported manifest version: ${manifest.version}`);
}

if (!Array.isArray(manifest.sources) || manifest.sources.length === 0) {
  fail(errors, 'The manifest must contain at least one source.');
}

if (!Array.isArray(manifest.records) || manifest.records.length === 0) {
  fail(errors, 'The manifest must contain at least one verification record.');
}

const sourceIds = new Set();
for (const source of manifest.sources ?? []) {
  if (!source.id || !source.label || !source.kind) {
    fail(errors, 'Every source requires id, label, and kind.');
    continue;
  }

  if (sourceIds.has(source.id)) {
    fail(errors, `Duplicate source id: ${source.id}`);
  }

  sourceIds.add(source.id);

  if (!source.url && !source.path && source.kind !== 'client-approval') {
    fail(errors, `Source ${source.id} requires a URL or local path.`);
  }

  if (source.path && !existsSync(join(root, source.path))) {
    fail(errors, `Local source does not exist: ${source.path}`);
  }
}

const recordIds = new Set();
const statusCounts = new Map();
const publicationCounts = new Map();
const approvalQueue = [];
const launchBlockers = [];

for (const record of manifest.records ?? []) {
  if (!record.id || !record.area || !record.label) {
    fail(errors, 'Every record requires id, area, and label.');
    continue;
  }

  if (recordIds.has(record.id)) {
    fail(errors, `Duplicate verification record id: ${record.id}`);
  }

  recordIds.add(record.id);

  if (!allowedStatuses.has(record.status)) {
    fail(errors, `Unknown status for ${record.id}: ${record.status}`);
  }

  if (!allowedPublicationStates.has(record.publication)) {
    fail(
      errors,
      `Unknown publication state for ${record.id}: ${record.publication}`,
    );
  }

  if (!Array.isArray(record.sourceIds) || record.sourceIds.length === 0) {
    fail(errors, `Record ${record.id} must identify at least one source.`);
  } else {
    for (const sourceId of record.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        fail(
          errors,
          `Record ${record.id} references unknown source ${sourceId}.`,
        );
      }
    }
  }

  if (
    record.publication === 'published' &&
    (record.status === 'pending' ||
      record.status === 'intentionally-omitted')
  ) {
    fail(
      errors,
      `Published record ${record.id} cannot have status ${record.status}.`,
    );
  }

  if (
    (record.status === 'pending' ||
      record.status === 'client-review-required') &&
    !record.ownerAction
  ) {
    fail(errors, `Record ${record.id} requires an ownerAction.`);
  }

  if (
    record.publication === 'published' &&
    record.sourceIds.length === 1 &&
    record.sourceIds[0] === 'client-approval' &&
    record.status !== 'client-approved'
  ) {
    fail(
      errors,
      `Published record ${record.id} is not supported by a public source or client approval.`,
    );
  }

  statusCounts.set(record.status, (statusCounts.get(record.status) ?? 0) + 1);
  publicationCounts.set(
    record.publication,
    (publicationCounts.get(record.publication) ?? 0) + 1,
  );

  if (
    record.status === 'pending' ||
    record.status === 'client-review-required'
  ) {
    approvalQueue.push(record);
  }

  if (
    record.status === 'pending' &&
    (record.publication === 'withheld' ||
      record.publication === 'placeholder')
  ) {
    launchBlockers.push(record);
  }
}

const sourceRoot = join(root, 'src');
const sourceFiles = walk(sourceRoot).filter((file) =>
  /\.(ts|tsx|json)$/.test(file),
);

const referencedIds = new Set();
for (const file of sourceFiles) {
  if (file === manifestPath) continue;
  const content = readFileSync(file, 'utf8');

  for (const recordId of recordIds) {
    if (content.includes(`'${recordId}'`) || content.includes(`"${recordId}"`)) {
      referencedIds.add(recordId);
    }
  }

  for (const match of content.matchAll(
    /verificationId\s*:\s*['"]([^'"]+)['"]/g,
  )) {
    if (!recordIds.has(match[1])) {
      fail(
        errors,
        `${relative(root, file)} references unknown verification id ${match[1]}.`,
      );
    }
  }
}

for (const record of manifest.records ?? []) {
  if (
    (record.publication === 'published' ||
      record.publication === 'placeholder') &&
    !referencedIds.has(record.id)
  ) {
    fail(
      errors,
      `Public record ${record.id} is not linked from typed content configuration.`,
    );
  }
}

console.log('\nBryan Mittelstadt content verification audit');
console.log('=============================================');
console.log(`Sources registered: ${sourceIds.size}`);
console.log(`Verification records: ${recordIds.size}`);
console.log(`Published records: ${publicationCounts.get('published') ?? 0}`);
console.log(`Withheld records: ${publicationCounts.get('withheld') ?? 0}`);
console.log(`Placeholder records: ${publicationCounts.get('placeholder') ?? 0}`);
console.log(`Client approval queue: ${approvalQueue.length}`);
console.log(`Launch blockers: ${launchBlockers.length}`);

console.log('\nStatus summary:');
for (const status of allowedStatuses) {
  console.log(`- ${status}: ${statusCounts.get(status) ?? 0}`);
}

if (approvalQueue.length > 0) {
  console.log('\nClient approval queue:');
  for (const record of approvalQueue) {
    console.log(`- ${record.id}: ${record.ownerAction}`);
  }
}

if (errors.length > 0) {
  console.error('\nVerification integrity failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nContent verification integrity checks passed.');
}
