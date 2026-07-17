# TwentyCRM Migration Plan

**Status:** In progress — Google Sheets remains operational until cutover  
**Owners:** Developer (API integration) · Implementation Specialist (CRM config + data migration)  
**Last updated:** July 2026

---

## Current state

Lead capture flows through **Google Apps Script** → **Web_Leads spreadsheet**:

| Form | Sheet tab | Client email |
|------|-----------|--------------|
| WebOps assessment (`/webops/`) | `webops` | Apps Script — intake + Cal links |
| RevOps review (`/revops/`) | `revops` | Apps Script — intake + Cal links |
| Managed Ops review (`/managed-ops/`) | `revops` | Apps Script — intake + Cal links |
| WebOps intake (completed) | `webops_intake` | MHGSYNC dashboard email |
| RevOps intake (completed) | `revops_intake` | MHGSYNC dashboard email |

Code references: [`apps-script/LeadsEndpoint/Code.gs`](../../apps-script/LeadsEndpoint/Code.gs), [`components/leads/LeadCaptureForms.tsx`](../../components/leads/LeadCaptureForms.tsx).

---

## Target state

TwentyCRM becomes the CRM of record for leads, opportunities, and renewal tracking. Google Sheets tabs remain as an SDR ops mirror during dual-write, then deprecate.

---

## Field mapping (draft)

### WebOps assessment → TwentyCRM

| Form field | TwentyCRM target |
|------------|------------------|
| `fullName` | Person name |
| `email` | Person email |
| `phone` | Person phone |
| `websiteUrl` | Company website |
| `industry` | Custom field / tag |
| `message` | Note on Person or Opportunity |
| `formSource` | Lead source |
| `intakeUrl` | Custom field (next-step link) |

### RevOps / Managed Ops review → TwentyCRM

| Form field | TwentyCRM target |
|------------|------------------|
| `fullName` | Person name |
| `workEmail` | Person email |
| `phone` | Person phone |
| `companyName` | Company name |
| `role` | Person title |
| `revenueChallenge` | Opportunity note / custom field |
| `formSource` | Lead source (distinguishes revops vs managed-ops) |

### Intake completion → TwentyCRM

| MHGSYNC field | TwentyCRM target |
|---------------|------------------|
| `dashboard_id` | External ID / custom field |
| `formType` | Pipeline stage trigger |
| `formData` | Attached note or linked record |

---

## Migration phases

1. **Setup (IS)** — TwentyCRM workspace, pipelines, custom fields, user roles
2. **Dual-write (Dev)** — Apps Script or MHGSYNC POSTs to TwentyCRM API alongside Sheets
3. **Validation (SDR + SC)** — Compare Sheets vs CRM for 2 weeks; fix mapping gaps
4. **Cutover** — Sheets become read-only mirror; SDR SOP updated to TwentyCRM-native views
5. **Deprecate Sheets capture** — Remove sheet append from lead forms; keep export/archive

---

## Blockers

- TwentyCRM API credentials and object schema decisions
- Handoff checklist object design (SDR → SC)
- Renewal-tracking fields for Account Manager
- Exec decision on whether MHGSYNC or Apps Script owns the TwentyCRM write path

---

## Related docs

- [`APPS_SCRIPT_LEADS_ENDPOINT.md`](../../APPS_SCRIPT_LEADS_ENDPOINT.md) — current lead pipeline
- [`docs/sops/03_SOP_SDR.md`](../sops/03_SOP_SDR.md) — SDR CRM hygiene
- [`docs/sops/07_SOP_DEVELOPER.md`](../sops/07_SOP_DEVELOPER.md) — Developer backlog
