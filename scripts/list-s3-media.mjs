import 'dotenv/config';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUCKET = process.env.AWS_S3_BUCKET || 'mhgstrategy';
const REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-2';
const BASE_URL = `https://${BUCKET}.s3.${REGION}.amazonaws.com`;
const OUTPUT_JSON = fileURLToPath(new URL('../S3_MEDIA_ASSETS.json', import.meta.url));
const OUTPUT_MD = fileURLToPath(new URL('../S3_MEDIA_ASSETS.md', import.meta.url));

const MEDIA_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.mp4',
  '.webm',
  '.mov',
  '.pdf',
]);

function parseAwsLsLine(line) {
  const match = line.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(\d+)\s+(.+)$/);
  if (!match) return null;

  const [, date, time, size, key] = match;
  const extension = key.includes('.') ? `.${key.split('.').pop().toLowerCase()}` : '';

  return {
    key,
    url: `${BASE_URL}/${encodeURI(key)}`,
    sizeBytes: Number(size),
    lastModified: `${date}T${time}Z`,
    extension,
    type: extension ? extension.slice(1) : 'unknown',
  };
}

function listFromS3() {
  const output = execFileSync(
    'aws',
    ['s3', 'ls', `s3://${BUCKET}/`, '--recursive', '--region', REGION],
    { encoding: 'utf8' },
  );

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseAwsLsLine)
    .filter(Boolean)
    .filter((asset) => MEDIA_EXTENSIONS.has(asset.extension))
    .sort((a, b) => a.key.localeCompare(b.key));
}

function walkSourceFiles(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.next' || entry === 'out') continue;

    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walkSourceFiles(fullPath, files);
      continue;
    }

    if (/\.(tsx?|jsx?|css|md|html)$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function listFromCodebase(rootDir) {
  const pattern = new RegExp(`${BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/([^"'\\)\\s]+)`, 'g');
  const assets = new Map();

  for (const filePath of walkSourceFiles(rootDir)) {
    const content = readFileSync(filePath, 'utf8');
    const relativePath = relative(rootDir, filePath);

    for (const match of content.matchAll(pattern)) {
      const key = decodeURIComponent(match[1]);
      const extension = key.includes('.') ? `.${key.split('.').pop().toLowerCase()}` : '';
      const existing = assets.get(key) || {
        key,
        url: `${BASE_URL}/${encodeURI(key)}`,
        sizeBytes: null,
        lastModified: null,
        extension,
        type: extension ? extension.slice(1) : 'unknown',
        usedIn: [],
      };

      if (!existing.usedIn.includes(relativePath)) {
        existing.usedIn.push(relativePath);
      }

      assets.set(key, existing);
    }
  }

  return Array.from(assets.values()).sort((a, b) => a.key.localeCompare(b.key));
}

function formatBytes(sizeBytes) {
  if (sizeBytes == null) return '—';
  if (sizeBytes < 1024) return `${sizeBytes} B`;
  if (sizeBytes < 1024 * 1024) return `${(sizeBytes / 1024).toFixed(1)} KB`;
  return `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
}

function writeMarkdown(inventory) {
  const lines = [
    '# S3 Media Assets',
    '',
    `Bucket: \`${BUCKET}\``,
    `Region: \`${REGION}\``,
    `Base URL: ${BASE_URL}`,
    '',
    `Generated: ${inventory.generatedAt}`,
    `Source: ${inventory.source}`,
    '',
    `Total assets: ${inventory.assets.length}`,
    '',
    '| File | Type | Size | Last Modified | Used In | URL |',
    '| --- | --- | --- | --- | --- | --- |',
  ];

  for (const asset of inventory.assets) {
    const usedIn = asset.usedIn?.length ? asset.usedIn.join(', ') : '—';
    lines.push(
      `| ${asset.key} | ${asset.type} | ${formatBytes(asset.sizeBytes)} | ${asset.lastModified || '—'} | ${usedIn} | ${asset.url} |`,
    );
  }

  writeFileSync(OUTPUT_MD, `${lines.join('\n')}\n`);
}

function writeJson(inventory) {
  writeFileSync(OUTPUT_JSON, `${JSON.stringify(inventory, null, 2)}\n`);
}

function main() {
  const rootDir = fileURLToPath(new URL('..', import.meta.url));
  const forceCodebase = process.argv.includes('--from-codebase');

  let assets;
  let source;

  if (!forceCodebase) {
    try {
      assets = listFromS3();
      source = 'aws-s3';
    } catch (error) {
      console.warn('Could not list S3 bucket directly. Falling back to codebase scan.');
      console.warn(error.message);
      assets = listFromCodebase(rootDir);
      source = 'codebase';
    }
  } else {
    assets = listFromCodebase(rootDir);
    source = 'codebase';
  }

  const inventory = {
    bucket: BUCKET,
    region: REGION,
    baseUrl: BASE_URL,
    generatedAt: new Date().toISOString(),
    source,
    assets,
  };

  writeJson(inventory);
  writeMarkdown(inventory);

  console.log(`Wrote ${assets.length} media assets to:`);
  console.log(`- ${OUTPUT_JSON}`);
  console.log(`- ${OUTPUT_MD}`);
}

main();
