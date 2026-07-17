# Form Submission Troubleshooting

Runbook for the **engagement assessment form** on `/contact/` and related Google Forms / Apps Script submission issues.

---

## Quick diagnosis (start here)

| Symptom | Likely cause | First check |
|---------|--------------|-------------|
| Row with **Timestamp only**, other columns blank | Stale Google Forms `fbzx` token or Google Forms path still active | [Symptom A](#symptom-a-timestamp-only-no-field-data) |
| **No row at all** in Contact tab, but UI shows success | Wrong submission path — site posting to Google Forms while you check Apps Script tab | [Symptom B](#symptom-b-no-row-at-all-in-contact-tab) |
| curl to Apps Script works, local site does not | Env flag not saved / dev server not restarted / local dev not using server proxy | [Symptom B](#symptom-b-no-row-at-all-in-contact-tab) |
| UI shows error on submit | Validation failure, proxy unreachable, or Leads URL missing | Network tab + curl tests below |

**Golden rule:** Never trust the UI success message alone. Always confirm a **full row** (all columns filled) in the correct sheet tab.

---

## Two submission backends (do not confuse them)

The engagement form can write to the spreadsheet through **two different systems**. They write to **different places** and behave differently.

```
┌─────────────────────────────────────────────────────────────────────────┐
│  PATH A — Google Forms (legacy, avoid for engagement form)              │
│  Browser/API → docs.google.com/forms → linked Form_Responses area       │
│  Failure mode: timestamp-only rows when fbzx is stale                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  PATH B — Apps Script Leads endpoint (current, recommended)            │
│  Browser/API → script.google.com/macros/.../exec → Contact tab          │
│  Writes all 12 columns directly via Code.gs                             │
└─────────────────────────────────────────────────────────────────────────┘
```

When debugging, always ask: **which path did this submit take?**

---

## Symptom A: Timestamp only, no field data

### What you see

- A new row appears with **Timestamp** filled in
- All other columns (Company Name, Email, Phone, etc.) are **blank**
- The website shows a **success message**

### Root cause

Google Forms requires a fresh anti-spam token called **`fbzx`** on every submission. It is embedded in the form HTML and **rotates on every page load** — it cannot be stored reliably in `.env.local`.

When the browser POSTs to Google Forms with a **stale `fbzx`**:

1. Google accepts the POST (no error returned to the client)
2. A linked-sheet row is created with **Timestamp only**
3. All `entry.*` field values are **silently discarded**

The website cannot detect this because submissions use `fetch(..., { mode: 'no-cors' })`, which hides the response body.

This is **not** a spreadsheet bug, wrong tab, or incorrect entry ID mapping.

### Fix

Switch to the Apps Script path (see [Current working configuration](#current-working-configuration-engagement-form)).

---

## Symptom B: No row at all in Contact tab

### What you see

- curl test to Apps Script succeeds and writes a full row (e.g. "Deploy Verify Co")
- Submitting from `http://127.0.0.1:1243/contact/` shows success but **nothing appears** in the **Contact** tab
- Previously you may have seen timestamp-only rows; now you see nothing

### Root causes (confirmed May 2026)

1. **Wrong path active** — Local site was still posting to **Google Forms** (Path A) while you checked the **Contact** tab (Path B). Google Forms writes to its linked responses area, not necessarily the same row layout Apps Script uses.

2. **Env var not saved to disk** — `NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true` was visible in the editor but **not saved** to `.env.local`. The running dev server never saw the flag, so `googleFormUrl` stayed set and the Google Forms proxy ran instead of Apps Script.

3. **Dev server not restarted** — `NEXT_PUBLIC_*` variables are baked in at dev server startup. Changing `.env.local` requires restarting `npm run dev`.

4. **Browser direct GET to Apps Script is silent** — When leads-only mode is active, the client fallback uses `fetch(..., { mode: 'no-cors' })` to Apps Script. This always appears to succeed in JavaScript even when the request fails. Local dev must use the **server proxy** instead.

### How we confirmed this

```bash
# 1. Apps Script endpoint healthy (Path B)
curl -sL "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
# Expected: {"ok":true,"version":"leads-endpoint-2026-05-23-contact-v1",...}

# 2. Apps Script writes full row
curl -sL "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?formSource=engagement-assessment&sheetName=Contact&companyName=Deploy+Verify+Co&email=test@example.com"
# Expected: {"ok":true}

# 3. Local API was still on Google Forms path (Path A) — the smoking gun
curl -s -X POST "http://127.0.0.1:1243/api/forms/submit/" \
  -H "Content-Type: application/json" \
  -d '{"formId":"engagement-assessment","values":{"companyName":"Test","email":"test@example.com"}}'
# BAD (Google Forms still active):  {"ok":true,"fbzxSource":"live","entryCount":...}
# GOOD (Apps Script active):       {"ok":true,"leadsSource":"server","paramCount":...}

# 4. Env flag missing from disk
grep ENGAGEMENT_SUBMIT .env.local
# Must print: NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true
```

### Fix applied

1. Saved `NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true` to `.env.local`
2. Extended `/api/forms/submit/` to forward leads-only forms server-side via [`serverLeadsSubmit.ts`](serverLeadsSubmit.ts)
3. Updated [`useGoogleForm.ts`](../../hooks/useGoogleForm.ts) to call the API proxy for leads-only forms in local dev (same as production static export fallback order)

---

## Current working configuration (engagement form)

### Environment variables (`.env.local` and production hosting)

```bash
NEXT_PUBLIC_LEADS_WEBAPP_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true
```

When `NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY=true`, [`config.ts`](config.ts) sets `googleFormUrl` to empty for the engagement form, disabling the Google Forms path entirely.

**Important:** Save the file to disk and restart the dev server after changing any `NEXT_PUBLIC_*` variable.

### Submission paths by environment

| Environment | Active path | How it works |
|-------------|-------------|--------------|
| **Local dev** (`npm run dev`) | `POST /api/forms/submit/` → server GET → Apps Script | [`serverLeadsSubmit.ts`](serverLeadsSubmit.ts) calls Apps Script and verifies `{"ok":true}` |
| **Production** (static export) | Browser GET → Apps Script | [`leadsEndpoint.ts`](leadsEndpoint.ts) — no API route available in static builds |

### Apps Script

- Source: [`apps-script/LeadsEndpoint/Code.gs`](../../apps-script/LeadsEndpoint/Code.gs)
- Version marker: `LEADS_ENDPOINT_VERSION = 'leads-endpoint-2026-05-23-contact-v1'`
- Contact branch: `sheetName === 'Contact' || formSource === 'engagement-assessment'`
- **Must redeploy** after code changes: Deploy → Manage deployments → Edit → New version → Deploy

See [APPS_SCRIPT_LEADS_ENDPOINT.md](../../APPS_SCRIPT_LEADS_ENDPOINT.md) for full deploy steps.

---

## Debug checklist (run in order)

### Step 1 — Confirm environment and config

```bash
# Env flag present on disk (not just in unsaved editor buffer)
grep -E "ENGAGEMENT_SUBMIT|LEADS_WEBAPP" .env.local

# Restart dev server after any NEXT_PUBLIC change
npm run dev   # port 1243
```

### Step 2 — Identify which path the API uses

```bash
curl -s -X POST "http://127.0.0.1:1243/api/forms/submit/" \
  -H "Content-Type: application/json" \
  -d '{
    "formId": "engagement-assessment",
    "values": {
      "companyName": "API Path Test",
      "primaryContactName": "Jane Doe",
      "email": "apitest@example.com",
      "phone": "555-0100",
      "website": "https://example.com",
      "industry": "SaaS",
      "financeSystems": "QuickBooks",
      "primaryChallenge": "Reporting",
      "organizationSize": "51-200",
      "urgency": "Within 30 days",
      "message": "Debug checklist test"
    }
  }'
```

| Response field | Meaning |
|----------------|---------|
| `"leadsSource":"server"` | Correct — Apps Script path (Path B) |
| `"fbzxSource":"live"` | Wrong for engagement form — still on Google Forms (Path A) |
| `"error":"...Leads endpoint..."` | `NEXT_PUBLIC_LEADS_WEBAPP_URL` missing or Apps Script not redeployed |

### Step 3 — Verify Apps Script independently

```bash
# Health check
curl -sL "$NEXT_PUBLIC_LEADS_WEBAPP_URL"

# Direct write test
curl -sL "${NEXT_PUBLIC_LEADS_WEBAPP_URL}?formSource=engagement-assessment&sheetName=Contact&companyName=Curl+Test+Co&email=curl@test.example"
```

Both should return `{"ok":true}`. Confirm the row in the **Contact** tab of Web_Leads.

### Step 4 — Verify browser submission

1. Open `http://127.0.0.1:1243/contact/` (hard refresh after env changes)
2. Submit with a unique company name
3. Network tab: look for `POST /api/forms/submit/` (local dev) — **not** direct POST to `docs.google.com/forms`
4. Check **Contact** tab for a full row with that company name

### Step 5 — Compare fbzx (only if still on Google Forms path)

```bash
curl -sL "https://docs.google.com/forms/d/e/1FAIpQLScfWtwJcSHZQe0vAqTIHUj03QJFZwxBjGtpAoRHUQbakkYjkQ/viewform" \
  | grep -o 'name="fbzx" value="[^"]*"'
```

If live token differs from `NEXT_PUBLIC_GOOGLE_FORM_ENGAGEMENT_FBZX`, direct browser POST will produce timestamp-only rows.

---

## Debug session log (May 2026)

### Phase 1 — Timestamp-only rows

| # | Hypothesis | Result |
|---|------------|--------|
| 1 | Client not sending field values | **Rejected** — logs showed 9+ entry fields in POST body |
| 2 | Wrong Google Forms entry IDs | **Rejected** — server-side POST with live fbzx wrote full rows |
| 3 | Stale `fbzx` in `.env.local` | **Confirmed** — env token differed from live viewform on every check |
| 4 | Client fallback to direct POST after proxy failure | **Confirmed** — fallback created timestamp-only rows |
| 5 | Google Forms programmatic POST unreliable even with live fbzx | **Confirmed** — switched to Apps Script |

### Phase 2 — curl works, local site does not

| # | Hypothesis | Result |
|---|------------|--------|
| 1 | Apps Script not deployed with Contact branch | **Rejected** — curl GET returned `{"ok":true}` and wrote full row |
| 2 | Browser GET to Apps Script blocked or silent | **Partial** — no-cors fetch cannot confirm delivery |
| 3 | `NEXT_PUBLIC_ENGAGEMENT_SUBMIT_VIA_LEADS_ONLY` not active | **Confirmed** — flag in editor but not saved; API returned `fbzxSource:"live"` |
| 4 | Checking wrong sheet tab | **Confirmed** — Google Forms vs Apps Script write to different targets |
| 5 | Local dev needs server proxy for Apps Script | **Confirmed** — fix: `serverLeadsSubmit.ts` + API route branch |

---

## What NOT to do

- **Do not** store `fbzx` in `.env.local` and expect it to work long-term — it goes stale within minutes
- **Do not** POST directly to Google Forms from the browser — creates timestamp-only rows with false success
- **Do not** trust the UI success message alone — always verify the sheet row
- **Do not** use hidden iframe POST to Apps Script — opens a popup with raw JSON
- **Do not** assume an env var is active because it appears in the editor — **save the file** and restart dev server
- **Do not** debug by checking the Contact tab while the site is still on the Google Forms path

---

## Related files

| File | Role |
|------|------|
| [`hooks/useGoogleForm.ts`](../../hooks/useGoogleForm.ts) | Submit orchestration: Google Forms proxy → Leads API proxy → direct Leads GET fallback |
| [`lib/forms/formSubmitProxy.ts`](formSubmitProxy.ts) | Client call to `/api/forms/submit/` |
| [`app/api/forms/submit/route.ts`](../../app/api/forms/submit/route.ts) | Dev API: Google Forms (legacy) or Apps Script (leads-only) |
| [`lib/forms/serverGoogleFormSubmit.ts`](serverGoogleFormSubmit.ts) | Server-side live fbzx fetch + Google Forms POST |
| [`lib/forms/serverLeadsSubmit.ts`](serverLeadsSubmit.ts) | Server-side Apps Script GET (local dev, verifiable) |
| [`lib/forms/leadsEndpoint.ts`](leadsEndpoint.ts) | Production browser GET to Apps Script (static export) |
| [`lib/forms/config.ts`](config.ts) | `engagementAssessmentFormConfig` + leads-only flag |
| [`apps-script/LeadsEndpoint/Code.gs`](../../apps-script/LeadsEndpoint/Code.gs) | Sheet writer + email notifications |

See also: [APPS_SCRIPT_LEADS_ENDPOINT.md](../../APPS_SCRIPT_LEADS_ENDPOINT.md) · [README.md](./README.md)
