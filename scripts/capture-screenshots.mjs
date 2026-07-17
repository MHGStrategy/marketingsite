// Reads site list from data/portfolio.json (shared with data/portfolio.ts).
// Uses headed Chrome — Cloudflare blocks headless Chromium on some client sites.
import { appendFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const logPath = join(root, '.cursor/debug-ca8987.log');
const portfolio = JSON.parse(readFileSync(join(root, 'data/portfolio.json'), 'utf8'));

const VIEWPORT = { width: 390, height: 844 };
const CLIP = { x: 0, y: 0, width: 390, height: 693 };
const outDir = join(root, 'public/portfolio');
const headless = process.argv.includes('--headless');
const onlySlug = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1];

mkdirSync(outDir, { recursive: true });

function log(message, data) {
  const line = JSON.stringify({
    sessionId: 'ca8987',
    runId: 'shots',
    hypothesisId: 'CF',
    location: 'scripts/capture-screenshots.mjs',
    message,
    data,
    timestamp: Date.now(),
  });
  try {
    appendFileSync(logPath, `${line}\n`);
  } catch {
    /* ignore */
  }
}

async function isCloudflareChallenge(page) {
  const title = await page.title();
  const body = await page.locator('body').innerText().catch(() => '');
  return /just a moment|security verification|verify you are human|checking your browser|cloudflare/i.test(
    `${title} ${body}`
  );
}

async function waitForRealPage(page, slug, maxMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    if (!(await isCloudflareChallenge(page))) {
      log('challenge cleared', { slug, title: await page.title(), elapsedMs: Date.now() - start });
      return true;
    }
    await page.waitForTimeout(1000);
  }
  log('challenge timeout', { slug, title: await page.title(), elapsedMs: Date.now() - start });
  return false;
}

const sites = onlySlug ? portfolio.filter((s) => s.slug === onlySlug) : portfolio;
const autoSites = sites.filter((s) => s.captureMode !== 'manual');

if (autoSites.length === 0) {
  console.log('No sites to capture (all manual or slug not found).');
  process.exit(0);
}

const browser = await chromium.launch(
  headless
    ? { headless: true }
    : { headless: false, channel: 'chrome' }
);

const ctx = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

let ok = 0;
let skipped = 0;

for (const site of autoSites) {
  const outPath = join(outDir, `${site.slug}.png`);
  const page = await ctx.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(1500);

    const cleared = await waitForRealPage(page, site.slug);
    if (!cleared) {
      console.warn(`⚠ ${site.slug}: Cloudflare challenge still visible — keeping existing screenshot`);
      log('skipped cloudflare', { slug: site.slug, keptExisting: existsSync(outPath) });
      skipped += 1;
      continue;
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: outPath, clip: CLIP });
    console.log(`✓ ${site.slug}`);
    log('captured', { slug: site.slug, headless, outPath });
    ok += 1;
  } catch (e) {
    console.error(`✗ ${site.slug}: ${e.message}`);
    log('error', { slug: site.slug, error: e.message });
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\nDone: ${ok} captured, ${skipped} skipped. Bump captured dates in data/portfolio.json for successful shots.`);
if (headless && skipped > 0) {
  console.log('Tip: re-run without --headless to use headed Chrome (bypasses most Cloudflare checks).');
}
