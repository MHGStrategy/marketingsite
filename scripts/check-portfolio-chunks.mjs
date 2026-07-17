// Pre/post fix diagnostic: checks webpack chunk files referenced by portfolio page.
import { appendFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logPath = join(root, '.cursor/debug-ca8987.log');
const runId = process.argv[2] ?? 'diagnostic';
const pagePath = join(root, '.next/server/app/portfolio/page.js');
const serverDir = join(root, '.next/server');

function log(hypothesisId, message, data) {
  const line = JSON.stringify({
    sessionId: 'ca8987',
    runId,
    hypothesisId,
    location: 'scripts/check-portfolio-chunks.mjs',
    message,
    data,
    timestamp: Date.now(),
  });
  appendFileSync(logPath, `${line}\n`);
}

const chunkRefs = [];
if (existsSync(pagePath)) {
  const src = readFileSync(pagePath, 'utf8');
  const matches = src.matchAll(/require\("\.\/(\d+\.js)"\)/g);
  for (const m of matches) chunkRefs.push(m[1]);
}

const serverChunks = existsSync(serverDir)
  ? readdirSync(serverDir).filter((f) => /^\d+\.js$/.test(f))
  : [];

const missing = chunkRefs.filter((c) => !existsSync(join(serverDir, c)));

log('A', 'portfolio page chunk audit', {
  pageExists: existsSync(pagePath),
  referencedChunks: chunkRefs,
  missingChunks: missing,
  serverChunkCount: serverChunks.length,
});

log('B', 'missing chunk file check', {
  chunk8948Exists: existsSync(join(serverDir, '8948.js')),
  errorMatchesUserReport: missing.includes('8948.js'),
});

console.log(JSON.stringify({ missing, chunk8948Exists: existsSync(join(serverDir, '8948.js')) }, null, 2));
