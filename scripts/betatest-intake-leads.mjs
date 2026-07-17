#!/usr/bin/env node
/**
 * API beta test: WebOps + RevOps intake leads tabs
 * Usage: node scripts/betatest-intake-leads.mjs
 *        npm run test:betatest:intake-leads
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
dotenv.config({ path: join(root, '.env.local') });

const TEST_EMAIL = 'shaun@mhgstrategy.com';
const MARKER = `BETATEST-${new Date().toISOString().replace(/[:.]/g, '-')}`;
const TIMESTAMP = new Date().toISOString();

const leadsUrl = process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL?.trim()?.replace(/\/$/, '');
if (!leadsUrl) {
  console.error('Missing NEXT_PUBLIC_LEADS_WEBAPP_URL in .env.local');
  process.exit(1);
}

const CASES = [
  {
    name: 'webops-intake',
    params: {
      sheetName: 'webops_intake',
      formSource: 'webops-intake',
      formType: 'general-business',
      clientName: `${MARKER} WebOps Intake`,
      clientEmail: TEST_EMAIL,
      dashboardId: '12345',
      dashboardUrl: 'https://sync.mhgstrategy.com/dashboard/general-business/12345',
      pagePath: '/webops/intake/general-business/',
      calBookUrl: 'https://cal.com/mhgstrategy/webops-discovery',
      responsesRecorded: '12',
      upsellSignals: '3',
      timestamp: TIMESTAMP,
    },
  },
  {
    name: 'revops-intake',
    params: {
      sheetName: 'revops_intake',
      formSource: 'revops-intake',
      formType: 'discovery',
      clientName: `${MARKER} RevOps Intake`,
      clientEmail: TEST_EMAIL,
      dashboardId: '67890',
      dashboardUrl: 'https://sync.mhgstrategy.com/dashboard/discovery/67890',
      pagePath: '/intake/',
      calBookUrl: 'https://cal.com/mhgstrategy/revops-review',
      responsesRecorded: '18',
      upsellSignals: '5',
      timestamp: TIMESTAMP,
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
  console.log('Expected tabs: webops_intake, revops_intake');
  console.log('Expected emails: New WebOps intake — … / New RevOps intake — …');
  console.log('Client emails (to shaun@mhgstrategy.com in betatest): intake thank-you + booking link');
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
