# Implementation Specialist SOP

**Mikel Hunt Group Inc. DBA MHG Strategy** · Version 1.1 · Effective June 2026

> Describes the **config-driven delivery function**, not a person. Currently shared by both principals.

---

## 1. Document control

| Field | Value |
|-------|-------|
| Function owner | Implementation Specialist |
| Current owner | Both principals (shared) |
| Approver | Executive Leadership |
| Version | 1.0 |
| Effective | June 2026 |
| Review cadence | Quarterly |

---

## 2. Purpose & scope

The Implementation Specialist executes delivery through **configuration, not code**: standing up tools, wiring integrations, migrating data, building automations, and onboarding the client to a working system.

**Seam vs. Developer:** if it's done in a platform's UI/settings or low-code config, it's Implementation. If it requires writing/maintaining custom software, it's Developer. When config hits a wall, escalate to Developer rather than improvising code.

### Owns
- TwentyCRM setup and configuration; Cal.com event types (WebOps Strategy Call, RevOps Review — 30 min, Google Calendar + Meet)
- Integration configuration, data migration (e.g., Google Sheets → TwentyCRM)
- Automation/workflow config and confirmation-email sequence setup
- Client onboarding, access provisioning guidance (Bluehost admin guide handoff), and go-live
- Handoff of the live, configured client to the Account Manager

### Does not own
- Architecture/spec (SA); custom code (Dev); commercial scope (SC); ongoing relationship (AM); invoicing (Finance).

---

## 3. Roles & responsibilities (RACI)

| Activity | IS | SA | Dev | AM |
|----------|----|----|----|----|
| Tool configuration | **R/A** | C (spec) | I | I |
| Data migration | **R** | C | C (if scripted) | I |
| Automation/email-sequence setup | **R** | C | C | I |
| Client onboarding & go-live | **R/A** | I | I | C |
| Live-client handoff | **R** | I | I | **A (accepts)** |

---

## 4. Systems & tools

| System | Use |
|--------|-----|
| TwentyCRM | Stand up and configure (replaces Sheets) |
| Cal.com | Event types + Google Calendar/Meet integration |
| MHGSYNC | Discovery dashboard, scope, onboarding tracking |
| Google Apps Script / Sheets | Current lead/automation config during migration |
| Bluehost / hosting | Client access provisioning + admin guide |
| Confirmation-email sequences | WebOps and RevOps tracks (segmented) |

---

## 5. Core workflows

### 5.1 Build-from-spec (post-payment)
1. Receive build spec/runbook from Solutions Architect (only after Finance confirms A4 payment).
2. Configure to spec: CRM objects/pipelines, integrations, automations, scheduling, email tracks.
3. Migrate data; validate against acceptance criteria in the spec.
4. Where config can't satisfy the spec, log a **config-blocked** ticket to Developer with the gap.

### 5.2 Email-sequence configuration
- Multi-track confirmation sequences segmented by service line. **WebOps** track: corrected contact details, 15-minute intake estimate, `{{first_name}}` merge field, **no AI/operations framing** (reserved for RevOps). **RevOps** track carries the AI/operations positioning. Verify merge fields before activation.

### 5.3 Onboarding & go-live
1. Provision client access; send Bluehost/hosting admin guide during onboarding.
2. **Conversion-gap check:** confirm any client-facing CTA points to a destination whose framing matches the entry point.
3. Validate the working system with the client, then hand off to Account Manager with documentation.

### 5.4 Handoff to Account Manager
Deliver: configured systems inventory, credentials/access map, automations live, known follow-ups, and the as-built notes (also fed back to SA).

---

## 6. Cross-team interfaces & dependencies

| We deliver to | What |
|---------------|------|
| Account Manager | Live, configured client + documentation |
| Solutions Architect | As-built feedback (divergences from spec) |
| Solutions Consultant | Delivery confirmation against scope |
| Finance | Confirmed live tool stack (AWS/Databricks/POS/CRM) for pass-through billing |
| Developer | Config-blocked escalations (gaps needing code) |
| Executive Leadership | Delivery status |

| We receive from | What |
|-----------------|------|
| Solutions Architect | Build spec / runbook |
| Developer | Features/tools to configure; fixes for blocked config |
| Solutions Consultant | Client context and scope |
| Finance | Payment-confirmed (A4) green light |

---

## 7. KPIs & success metrics (proposed)

| Metric | Target (initial) |
|--------|------------------|
| On-time go-live (vs. agreement timeline) | ≥ 85% |
| Deliverables passing acceptance first round | ≥ 80% |
| Config-blocked escalations per project | ≤ 1 |
| Onboarding completeness at handoff (checklist) | 100% |
| Merge-field/automation defects at launch | 0 |

---

## 8. Controls, compliance & risk

- **Never start before A4** payment confirmation.
- Handle client credentials and third-party access per the SA's data/security design and any NDA; least-privilege provisioning.
- Verify automations and merge fields in a test send before client-facing activation (a bad merge field is a credibility hit).

---

## 9. Escalation & exceptions

Config can't meet spec → Developer. Spec ambiguous/infeasible → Solutions Architect. Timeline at risk → SC + Exec.

---

## 10. Cadence

| Rhythm | Activity |
|--------|----------|
| Per project | Build → validate → onboard → handoff |
| Weekly | Delivery standup with SA/Dev; blocked-config review |
| Monthly | Reusable-config/template review |

---

## 11. Quick reference & open items

| Open item | Status |
|-----------|--------|
| TwentyCRM migration from Sheets | In setup |
| Cal.com event types (WebOps Strategy Call, RevOps Review) | To create (30 min + Meet) |
| GoDaddy/Bluehost admin guide (onboarding) | Bluehost live; GoDaddy TBD |
| Onboarding checklist in MHGSYNC | To build |

**Contact:** hello@mhgstrategy.com · (925) 290-8604

---

## Revision history
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial Implementation Specialist function SOP |
| 1.1 | June 2026 | Added confirmed-tool-stack handoff to Finance for pass-through billing |
