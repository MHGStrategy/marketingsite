/**
 * Renders cover.html → crisp 1702×630 PNG via Playwright at 2× then LANCZOS downsample.
 */
import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath, pathToFileURL } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const root = path.resolve(__dirname, '../..');
  const htmlPath = path.join(__dirname, 'cover.html');
  const rawPath = path.join(__dirname, '_raw-2x.png');
  const outPublic = path.join(root, 'public', 'facebook-cover-mhg-strategy.png');
  const outDesktop = path.join(os.homedir(), 'Desktop', 'facebook-cover-mhg-strategy.png');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1702, height: 630 },
    deviceScaleFactor: 2, // retina capture → sharper downsample
  });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' });

  await page.evaluate(async () => {
    const bg = getComputedStyle(document.querySelector('.hero')).backgroundImage;
    const m = /url\(["']?(.*?)["']?\)/.exec(bg || '');
    if (!m) return;
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = m[1];
    });
  });

  await page.locator('#cover').screenshot({
    path: rawPath,
    type: 'png',
    animations: 'disabled',
  });
  await browser.close();

  // 3404×1260 → 1702×630
  const py = `
from PIL import Image
im = Image.open(${JSON.stringify(rawPath)}).convert('RGB')
print('raw', im.size)
out = im.resize((1702, 630), Image.Resampling.LANCZOS)
out.save(${JSON.stringify(outPublic)}, 'PNG', optimize=True)
out.save(${JSON.stringify(outDesktop)}, 'PNG', optimize=True)
print('final', out.size)
`;
  const r = spawnSync('python3', ['-c', py], { encoding: 'utf8' });
  process.stdout.write(r.stdout || '');
  process.stderr.write(r.stderr || '');
  if (r.status !== 0) process.exit(1);

  console.log('Wrote', outPublic);
  console.log('Wrote', outDesktop);
  console.log(`KB: ${(fs.statSync(outPublic).size / 1024).toFixed(1)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
