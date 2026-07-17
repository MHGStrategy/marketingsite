# Developer SOP

**Mikel Hunt Group Inc. DBA MHG Strategy** · Version 1.0 · Effective June 2026

> Describes the **custom-software function**, not a person. Currently shared by both principals.

---

## 1. Document control

| Field | Value |
|-------|-------|
| Function owner | Developer |
| Current owner | Both principals (shared) |
| Approver | Executive Leadership |
| Version | 1.0 |
| Effective | June 2026 |
| Review cadence | Quarterly |

---

## 2. Purpose & scope

The Developer builds and maintains the software the entire firm runs on: client-facing sites and the **MHGSYNC backoffice (CRM + project-management tool)**. This function is unusual — its "client" is partly external (client builds) and partly internal (the tooling every other function depends on).

**Seam vs. Implementation Specialist:** Developer writes and maintains code; Implementation configures the things that code and platforms expose. A request that can be satisfied in platform settings goes to IS; a request that needs new/changed software comes here.

### Owns
- Public site (Next.js 14 App Router, static export, Tailwind) — pages, forms, conversion router
- MHGSYNC backoffice: CRM, PM module, discovery dashboard, intake API (`/api/intake`)
- Apps Script leads endpoint and email automation plumbing
- Custom integrations requiring code; MHGSYNC API and leads-endpoint maintenance
- Internal tooling reliability, security, deploys, and the codebase TODO backlog

### Does not own
- Config in platform UIs (IS); architecture decisions (SA — Developer implements them); content/copy (Marketing); commercial scope (SC).

---

## 3. Roles & responsibilities (RACI)

| Activity | Dev | SA | IS | Mktg | Exec |
|----------|-----|----|----|----|------|
| Custom code (sites, MHGSYNC, APIs) | **R/A** | C (spec) | I | C (copy) | A (priority) |
| Internal tooling roadmap | **R** | C | C | C | **A** |
| Platform constraints feedback | **R/A** | C | I | I | I |
| Deploys & reliability | **R/A** | I | I | I | I |
| Security of code/data plumbing | **R/A** | C | C | I | A |

---

## 4. Systems & tools

| System | Use |
|--------|-----|
| Cursor | Implementation (Claude produces Cursor prompts) |
| GitHub | Source control |
| Next.js 14 / Tailwind | Site stack; palette: #239bf6, #000, #FFF, #FFD700, gray scale |
| MHGSYNC codebase | CRM, PM, intake API |
| Google Apps Script | Leads endpoint (assessment capture), email automation |
| Shared hosting (static export) | Deploy target |

---

## 5. Core workflows

### 5.1 Build from spec
1. Receive code spec from Solutions Architect (client work) or roadmap item from Exec (internal tooling).
2. Implement against acceptance criteria; keep CSS/JS in-file and honor the design system.
3. Test, deploy, and hand configurable surfaces to Implementation Specialist.

### 5.2 Internal tooling (CRM + PM build)
- Prioritized by Exec. Current thrust: **MHGSYNC PM module** and CRM enhancements that SA/IS/AM run delivery through.
- Lead architecture: assessment forms → Sheets ([LEAD_PIPELINE.md](../processes/LEAD_PIPELINE.md)); intake → MHGSYNC `/api/intake`.

### 5.3 Site/conversion changes (Marketing-driven)
1. Marketing files copy/structure change requests (e.g., RevOps "fractional" landing page, two-card router, conversion-gap fixes).
2. Developer implements; confirms the destination framing matches the entry CTA before shipping.

### 5.4 Reliability
- Monitor the leads pipeline (Apps Script → Sheets → email). On confirmation-email failures, check `Email_Errors` and re-run Gmail authorization. Keep Cal.com URLs in sync across `.env.local` and Apps Script constants.

---

## 6. Cross-team interfaces & dependencies

| We deliver to | What |
|---------------|------|
| Implementation Specialist | Shipped features/tools to configure; fixes for blocked config |
| Solutions Architect | Platform constraints and capabilities |
| Marketing | Shipped site/conversion features |
| SDR / SC / AM | Working CRM, PM, booking, intake systems |
| Finance | Billing-system / Stripe-integration features |
| Executive Leadership | Roadmap status and technical risk |

| We receive from | What |
|-----------------|------|
| Solutions Architect | Code specifications |
| Executive Leadership | Tooling roadmap priority, build-vs-buy decisions |
| Marketing | Page/copy change requests |
| All functions | Bug reports and feature requests |

---

## 7. KPIs & success metrics (proposed)

| Metric | Target (initial) |
|--------|------------------|
| Internal tooling uptime (CRM/PM/leads) | ≥ 99% |
| Lead-pipeline email failure rate | < 1% |
| Spec → shipped cycle time (small change) | ≤ 3 business days |
| Production defects per release | Trend to 0 |
| MHGSYNC CRM/PM feature delivery | On roadmap |

---

## 8. Controls, compliance & risk

- **Internal tooling is single-point-of-failure risk** at N=2: the CRM, leads endpoint, and intake API gate revenue. Treat outages as L3.
- Secrets in environment config, never in source; least-privilege on integrations.
- No untested deploy to production lead-capture paths — a broken form is invisible lost revenue.
- Honor the design system and entity/brand standards on all client-facing output.

---

## 9. Escalation & exceptions

Architecture conflict → Solutions Architect. Priority conflict across requests → Exec (single backlog owner). Security incident → Exec immediately (L3).

---

## 10. Cadence

| Rhythm | Activity |
|--------|----------|
| Daily | Monitor lead pipeline; work prioritized backlog |
| Weekly | Roadmap/standup with SA + IS; deploy review |
| Monthly | Tech-debt and TODO-backlog grooming |

---

## 11. Quick reference & open items

| Open item | Status |
|-----------|--------|
| MHGSYNC PM module | In build |
| Lead pipeline reference | [LEAD_PIPELINE.md](../processes/LEAD_PIPELINE.md) |
| Conversion router + RevOps "fractional" page | Pending Marketing spec |
| Invoicing/Stripe integration surface for Finance | To scope — requirements doc needed; canonical billing policy in Finance §5 |

**Contact:** hello@mhgstrategy.com · (925) 290-8604

---

## Revision history
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial Developer function SOP |
