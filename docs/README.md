# MHG Strategy Documentation

Central index for internal process documentation and operational runbooks.

## Operating SOPs (canonical)

**[→ Operating SOP Index](sops/00_SOP_INDEX.md)** — start here.

The ten documents under [`docs/sops/`](sops/00_SOP_INDEX.md) are the **canonical blueprint** for everything built digitally: MHGSYNC backoffice (CRM + project management), the public site ([mhgstrategy.com](https://mhgstrategy.com)), intake/lead forms, workflow automations, and billing. Data models, routes, role/permission boundaries, automation logic, and billing rules should conform to them.

| # | Function | Document |
|---|----------|----------|
| 00 | Index | [00_SOP_INDEX.md](sops/00_SOP_INDEX.md) |
| 01 | Executive Leadership | [01_SOP_EXECUTIVE_LEADERSHIP.md](sops/01_SOP_EXECUTIVE_LEADERSHIP.md) |
| 02 | Marketing | [02_SOP_MARKETING.md](sops/02_SOP_MARKETING.md) |
| 03 | SDR (top of funnel) | [03_SOP_SDR.md](sops/03_SOP_SDR.md) |
| 04 | Solutions Consultant (close) | [04_SOP_SOLUTIONS_CONSULTANT.md](sops/04_SOP_SOLUTIONS_CONSULTANT.md) |
| 05 | Solutions Architect | [05_SOP_SOLUTIONS_ARCHITECT.md](sops/05_SOP_SOLUTIONS_ARCHITECT.md) |
| 06 | Implementation Specialist | [06_SOP_IMPLEMENTATION_SPECIALIST.md](sops/06_SOP_IMPLEMENTATION_SPECIALIST.md) |
| 07 | Developer | [07_SOP_DEVELOPER.md](sops/07_SOP_DEVELOPER.md) |
| 08 | Finance (rate card §5.2) | [08_SOP_FINANCE.md](sops/08_SOP_FINANCE.md) |
| 09 | Account Manager | [09_SOP_ACCOUNT_MANAGER.md](sops/09_SOP_ACCOUNT_MANAGER.md) |

The former single Sales SOP is retired. Top-of-funnel detail lives in **SDR (03 §5.4–5.7)**; A1–A5 lifecycle ownership and NDA rules live in **Solutions Consultant (04 §5)**.

## Process documentation (supplementary)

Client-facing lifecycle detail and delivery-phase reference. Operational ownership is defined by the SOPs above.

| Document | Status | Description |
|----------|--------|-------------|
| [Web Services Lifecycle](processes/WEB_SERVICES_LIFECYCLE.md) | Active (v2) | Delivery phases B–C and client-facing lifecycle — [public page](https://mhgstrategy.com/webops/lifecycle/) · [team page](https://mhgsync.com/sales/lifecycle/) |

## Operational runbooks

Technical docs for systems and integrations. These implement SOP requirements; when a runbook conflicts with an SOP, **the SOP wins** — flag the discrepancy for update.

| Document | Description |
|----------|-------------|
| [Apps Script Leads Endpoint](../APPS_SCRIPT_LEADS_ENDPOINT.md) | Leads sheet tabs, deploy/redeploy, email notifications |
| [Form System](../lib/forms/README.md) | Contact, offers, and claim form architecture |
| [Form Troubleshooting](../lib/forms/TROUBLESHOOTING.md) | Submission debugging (Google Forms vs Apps Script) |
| [Insights / Blog Posts](../lib/insights/README.md) | How to publish a new `/insights/` article |
| [Google Forms Setup](../GOOGLE_FORMS_SETUP.md) | Legacy Google Forms environment configuration |
| [S3 Media Assets](../S3_MEDIA_ASSETS.md) | Auto-generated inventory of `mhgstrategy` bucket assets |

## Site tools referenced by SOPs

| Tool | URL / path |
|------|------------|
| Intake hub | [mhgstrategy.com/webops/intake](https://mhgstrategy.com/webops/intake/) |
| Bluehost admin guide | [mhgstrategy.com/webops/bluehost](https://mhgstrategy.com/webops/bluehost/) |
| Web Services lifecycle (client-facing) | [mhgstrategy.com/webops/lifecycle](https://mhgstrategy.com/webops/lifecycle/) · [mhgsync.com/sales/lifecycle](https://mhgsync.com/sales/lifecycle/) |
| Web Services landing | [mhgstrategy.com/webops](https://mhgstrategy.com/webops/) |

## Planned additions

- `lib/intake/README.md` — intake verticals, MHGSYNC API contract, environment variables
