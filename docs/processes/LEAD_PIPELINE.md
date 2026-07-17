# Lead pipeline & CRM architecture

**Status:** Active — matches production  
**Owners:** Developer (integrations) · SDR (sheet hygiene) · SC/AM (MHGSYNC data)  
**Last updated:** July 2026

---

## Summary

| Layer | System | Role |
|-------|--------|------|
| **CRM (system of record)** | **MHGSYNC** ([mhgsync.com](https://mhgsync.com/)) | Intake submissions, discovery dashboards, scope drafts, pipeline, delivery, account health (in build) |
| **Assessment capture** | **Google Sheets** via Apps Script | WebOps / RevOps / Managed Ops **review** forms — row + email notification |
| **SDR ops mirror** | Same **Web_Leads** spreadsheet | Best-effort rows after completed **intake** (alongside MHGSYNC); SDR disposition before discovery |

Sheets does **not** replace MHGSYNC. Assessment leads land in Sheets until SC/SDR moves them into the MHGSYNC intake flow. Completed intakes are owned by MHGSYNC; the sheet tab is for SDR tracking only.

---

## Assessment forms → Sheets

Inbound **review/assessment** forms POST to the Apps Script leads endpoint → tab on `Web_Leads` → email to `hello@mhgstrategy.com`.

| Form | Sheet tab | Client email |
|------|-----------|--------------|
| WebOps assessment (`/webops/`) | `webops` | Apps Script — intake + Cal links |
| RevOps review (`/revops/`) | `revops` | Apps Script — intake + Cal links |
| Managed Ops review (`/managed-ops/`) | `revops` | Apps Script — intake + Cal links |

Code: [`apps-script/LeadsEndpoint/Code.gs`](../../apps-script/LeadsEndpoint/Code.gs), [`components/leads/LeadCaptureForms.tsx`](../../components/leads/LeadCaptureForms.tsx).  
Runbook: [`APPS_SCRIPT_LEADS_ENDPOINT.md`](../../APPS_SCRIPT_LEADS_ENDPOINT.md).

---

## Intake forms → MHGSYNC

Intake verticals POST to **MHGSYNC** `/api/intake`. On success, MHGSYNC generates the personalized discovery dashboard, sends the client email, and holds full `formData` plus a 5-digit dashboard ID.

| Intake path | MHGSYNC | SDR sheet tab (mirror) |
|-------------|---------|------------------------|
| `/webops/intake/*`, `/webservices/intake/*` | System of record | `webops_intake` |
| `/intake/` (RevOps discovery) | System of record | `revops_intake` |

Code: [`components/intake/IntakeForm.tsx`](../../components/intake/IntakeForm.tsx), [`lib/forms/intakeLeadsSheet.ts`](../../lib/forms/intakeLeadsSheet.ts).  
MHGSYNC confirmation emails replace disabled Apps Script intake emails in `Code.gs`.

---

## SDR daily hygiene

Monitor `hello@mhgstrategy.com` and the Web_Leads tabs daily. See [SDR SOP §5.7](../sops/03_SOP_SDR.md) for column schema and disposition. Email failures → `Email_Errors` tab; Developer re-runs Gmail authorization on the Apps Script deployment.

---

## Related docs

- [SDR SOP §5.4–5.7](../sops/03_SOP_SDR.md) — routing, offers funnel, CRM hygiene
- [Developer SOP](../sops/07_SOP_DEVELOPER.md) — leads endpoint, MHGSYNC intake API
- [SOP index §5](../sops/00_SOP_INDEX.md) — shared systems matrix
