#!/usr/bin/env node
/**
 * Beta test: ping Apps Script version + submit one payload per leads branch.
 * Loads NEXT_PUBLIC_LEADS_WEBAPP_URL from .env.local (or .env.deploy.local won't have it).
 *
 * Usage: npm run test:betatest:leads
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

dotenv.config({ path: join(root, '.env.local') });

const EXPECTED_VERSION = 'leads-endpoint-2026-06-23-lead-emails-v1';
const LEGACY_VERSION = 'leads-endpoint-2026-05-23-contact-v1';
const ACCEPTED_VERSIONS = new Set([
  EXPECTED_VERSION,
  LEGACY_VERSION,
  'leads-endpoint-2026-06-24-intake-client-email-v1',
]);
const MARKER = `BETATEST-${new Date().toISOString().replace(/[:.]/g, '-')}`;

function requireLeadsUrl() {
  const url = process.env.NEXT_PUBLIC_LEADS_WEBAPP_URL?.trim();
  if (!url) {
    throw new Error(
      'Missing NEXT_PUBLIC_LEADS_WEBAPP_URL in .env.local — required for API beta tests.',
    );
  }
  return url.replace(/\/$/, '');
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { redirect: 'follow', ...options });
  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, body: JSON.parse(text), raw: text };
  } catch {
    return { ok: res.ok, status: res.status, body: null, raw: text };
  }
}

function buildQuery(params) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) qs.set(k, String(v));
  }
  return qs.toString();
}

/** @type {Array<{ name: string; method: 'GET' | 'POST'; params: Record<string, string> }>} */
const CASES = [
  {
    name: 'webops-assessment',
    method: 'GET',
    params: {
      formSource: 'webops-assessment',
      sheetName: 'webops',
      fullName: MARKER,
      email: `betatest+webops@mhgstrategy.com`,
      websiteUrl: 'https://betatest.example.com',
      phone: '925-555-0100',
      message: `${MARKER} WebOps API test`,
      industry: 'other',
      timestamp: new Date().toISOString(),
    },
  },
  {
    name: 'revops-review',
    method: 'GET',
    params: {
      formSource: 'revops-review',
      sheetName: 'revops',
      fullName: MARKER,
      workEmail: `betatest+revops@mhgstrategy.com`,
      email: `betatest+revops@mhgstrategy.com`,
      primaryContactName: MARKER,
      phone: '925-555-0100',
      companyName: `${MARKER} Co`,
      role: 'Beta Tester',
      revenueChallenge: 'Pipeline visibility and forecasting',
      message: `Role: Beta Tester. Biggest revenue challenge: Pipeline visibility and forecasting`,
      timestamp: new Date().toISOString(),
    },
  },
  {
    name: 'managed-ops-review',
    method: 'GET',
    params: {
      formSource: 'managed-ops-review',
      sheetName: 'revops',
      fullName: MARKER,
      workEmail: `betatest+managed@mhgstrategy.com`,
      email: `betatest+managed@mhgstrategy.com`,
      primaryContactName: MARKER,
      phone: '925-555-0101',
      companyName: `${MARKER} Co`,
      role: 'Beta Tester',
      revenueChallenge: "Systems don't talk to each other",
      message: `Role: Beta Tester. Biggest revenue challenge: Systems don't talk to each other`,
      timestamp: new Date().toISOString(),
    },
  },
  {
    name: 'engagement-assessment',
    method: 'GET',
    params: {
      formSource: 'engagement-assessment',
      sheetName: 'Contact',
      companyName: `${MARKER} Co`,
      primaryContactName: MARKER,
      email: `betatest+engagement@mhgstrategy.com`,
      phone: '925-555-0101',
      website: 'https://betatest.example.com',
      industry: 'General Business',
      financeSystems: 'QuickBooks',
      primaryChallenge: 'Reporting Accuracy',
      organizationSize: '51–200 employees',
      urgency: 'Exploring now',
      message: `${MARKER} engagement API test`,
    },
  },
  {
    name: 'contact (MHG_New_Leads fallback)',
    method: 'GET',
    params: {
      formSource: 'contact',
      companyName: `${MARKER} Co`,
      primaryContactName: MARKER,
      email: `betatest+contact@mhgstrategy.com`,
      phone: '925-555-0103',
      website: 'https://betatest.example.com',
      industry: 'Consulting',
      message: `${MARKER} contact API test`,
    },
  },
];

async function main() {
  const baseUrl = requireLeadsUrl();
  const results = [];

  console.log(`\nLeads endpoint beta test`);
  console.log(`Marker: ${MARKER}\n`);

  // Version ping
  const ping = await fetchJson(baseUrl);
  const versionOk =
    ping.body?.ok === true &&
    (ACCEPTED_VERSIONS.has(ping.body?.version) || ping.body?.version?.startsWith('leads-endpoint-'));
  results.push({
    name: 'version-ping',
    pass: versionOk,
    detail: versionOk
      ? `${ping.body.version}${ping.body.version === LEGACY_VERSION ? ' (redeploy Apps Script for latest)' : ''}`
      : `got ${ping.body?.version ?? ping.raw.slice(0, 120)}`,
  });

  for (const testCase of CASES) {
    const qs = buildQuery(testCase.params);
    let result;
    if (testCase.method === 'GET') {
      result = await fetchJson(`${baseUrl}?${qs}`);
    } else {
      result = await fetchJson(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: qs,
      });
    }
    const pass = result.body?.ok === true;
    results.push({
      name: testCase.name,
      pass,
      detail: pass ? 'ok' : result.raw.slice(0, 200),
    });
  }

  console.log('Results:');
  console.log('─'.repeat(60));
  let allPass = true;
  for (const r of results) {
    const icon = r.pass ? 'PASS' : 'FAIL';
    if (!r.pass) allPass = false;
    console.log(`${icon.padEnd(5)} ${r.name.padEnd(32)} ${r.detail}`);
  }
  console.log('─'.repeat(60));
  console.log(allPass ? '\nAll API beta tests passed.' : '\nSome API beta tests failed.');
  console.log(`\nManual: verify sheet rows and emails contain marker: ${MARKER}\n`);

  if (!allPass) process.exit(1);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
