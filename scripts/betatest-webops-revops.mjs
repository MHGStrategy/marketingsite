#!/usr/bin/env node
/**
 * API beta test: WebOps + RevOps only, all fields, shaun@mhgstrategy.com
 * Usage: node scripts/betatest-webops-revops.mjs
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
dotenv.config({ path: join(root, '.env.local') });

const TEST_EMAIL = 'shaun@mhgstrategy.com';
const MARKER = `BETATEST-${new Date().toISOString().replace(/[:.]/g, '-')}`;

const leadsUrl = process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL?.trim()?.replace(/\/$/, '');
if (!leadsUrl) {
  console.error('Missing NEXT_PUBLIC_LEADS_WEBAPP_URL in .env.local');
  process.exit(1);
}

const CASES = [
  {
    name: 'webops-assessment',
    params: {
      formSource: 'webops-assessment',
      sheetName: 'webops',
      fullName: `${MARKER} WebOps`,
      primaryContactName: `${MARKER} WebOps`,
      email: TEST_EMAIL,
      websiteUrl: 'https://betatest.mhgstrategy.com',
      website: 'https://betatest.mhgstrategy.com',
      phone: '925-290-8604',
      message: `${MARKER} WebOps API beta test — all fields filled.`,
      industry: 'home-services',
      intakeUrl: 'https://www.mhgstrategy.com/webops/intake/home-services/',
      calBookUrl: 'https://www.mhgstrategy.com/webops/#contact',
      timestamp: new Date().toISOString(),
    },
  },
  {
    name: 'revops-review',
    params: {
      formSource: 'revops-review',
      sheetName: 'revops',
      fullName: `${MARKER} RevOps`,
      primaryContactName: `${MARKER} RevOps`,
      workEmail: TEST_EMAIL,
      email: TEST_EMAIL,
      phone: '925-290-8604',
      companyName: `${MARKER} Co`,
      role: 'President',
      revenueChallenge: 'Pipeline visibility and forecasting',
      message: 'Role: President. Biggest revenue challenge: Pipeline visibility and forecasting',
      intakeUrl: 'https://www.mhgstrategy.com/intake/',
      calBookUrl: 'https://www.mhgstrategy.com/revops/#lead-form',
      timestamp: new Date().toISOString(),
    },
  },
];

async function main() {
  const pingRes = await fetch(leadsUrl);
  const ping = await pingRes.json();
  console.log('Version ping:', ping);

  let failed = 0;
  for (const c of CASES) {
    const qs = new URLSearchParams(c.params).toString();
    const res = await fetch(`${leadsUrl}?${qs}`, { redirect: 'follow' });
    const body = await res.json();
    const pass = body?.ok === true;
    console.log(`${pass ? 'PASS' : 'FAIL'} ${c.name}:`, body);
    if (!pass) failed++;
  }

  console.log(`\nMarker for sheet lookup: ${MARKER}`);
  console.log(`Test email: ${TEST_EMAIL}`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
