# Solutions Architect SOP

**Mikel Hunt Group Inc. DBA MHG Strategy** · Version 1.1 · Effective June 2026

> Describes the **technical design authority function**, not a person. Currently shared by both principals.

---

## 1. Document control

| Field | Value |
|-------|-------|
| Function owner | Solutions Architect |
| Current owner | Both principals (shared) |
| Approver | Executive Leadership |
| Version | 1.0 |
| Effective | June 2026 |
| Review cadence | Quarterly |

---

## 2. Purpose & scope

The Solutions Architect is the bridge between "what we sold" and "what we build." It converts validated business scope into a feasible technical design and a build specification that Implementation and Developers can execute without re-deciding architecture.

**Seam vs. Solutions Consultant:** SC owns *commercial* scope (what the client buys, at what price). SA owns *technical* design (how it's built, at what effort/risk). SA feeds effort/feasibility back so SC can finalize price and timeline.

**Seam vs. Developer:** SA decides *what the system should be*; Developer decides *how to code it*. SA produces specs; Developer produces code.

### Owns
- Target-state architecture for RevOps integrations and complex WebOps builds
- Feasibility assessment and effort estimation (inputs to pricing/timeline)
- Build specification / runbook handed to Implementation and code spec handed to Developers
- Technical scope boundaries, data/security design (NDA-relevant), and change-request technical impact

### Does not own
- Commercial scope/price (SC); config execution (IS); custom code (Dev); account relationship (AM).

---

## 3. Roles & responsibilities (RACI)

| Activity | SA | SC | IS | Dev | Exec |
|----------|----|----|----|----|------|
| Feasibility & effort estimate | **R/A** | C | C | C | I |
| Target-state architecture | **R/A** | I | C | C | I |
| Build spec / runbook (config) | **R** | I | **A (consumes)** | I | I |
| Code spec (custom) | **R** | I | I | **A (consumes)** | I |
| Change-request technical impact | **R/A** | C | C | C | C |

---

## 4. Systems & tools

| System | Use |
|--------|-----|
| MHGSYNC discovery dashboard | Scope draft → architecture inputs |
| Architecture/spec docs (Workspace) | Build specs, runbooks, diagrams |
| Target platforms | TwentyCRM, Cal.com, Google/Meet, integrations, Bluehost/hosting |
| MHGSYNC / site codebase | Platform constraints (with Developer) |

---

## 5. Core workflows

### 5.1 Pre-close feasibility (supports SC)
1. On a complex/multi-system opportunity, SC requests feasibility.
2. SA assesses integration surface, data model, security needs, and effort; returns estimate + technical boundaries.
3. SC finalizes commercial scope, price, and timeline using those inputs.

### 5.2 Design → spec (post-payment)
1. After Finance confirms payment (A4), SA designs target state.
2. Produce two artifacts as applicable:
   - **Build spec / runbook** for config-driven work → Implementation Specialist (CRM setup, integrations, migration, automations, onboarding steps).
   - **Code spec** for anything requiring custom development → Developer (site features, MHGSYNC modules, API work).
3. Define out-of-scope explicitly and the acceptance criteria per deliverable.
4. **Flag tool-cost implications:** the platforms the design requires (AWS, Databricks, POS, CRM, etc.) become **client pass-through fees** (Finance §5.2). Hand the expected tool list to Finance and SC so the retainer + pass-through is priced correctly.

### 5.3 Change control
Any mid-build change runs through SA for technical-impact assessment; material impact routes back to SC (commercial) and Exec (approval) before work proceeds.

---

## 6. Cross-team interfaces & dependencies

| We deliver to | What |
|---------------|------|
| Solutions Consultant | Feasibility, effort estimate, technical scope boundaries |
| Implementation Specialist | Build spec / runbook for config delivery |
| Developer | Code specification for custom work |
| Finance | Cost-of-delivery inputs (effort → margin); tool list → pass-through fee schedule |
| Executive Leadership | Technical risk and effort visibility |

| We receive from | What |
|-----------------|------|
| Solutions Consultant | Validated business scope and requirements |
| Developer | Platform constraints/capabilities of MHGSYNC and sites |
| Implementation Specialist | As-built feedback (what diverged from spec) |

---

## 7. KPIs & success metrics (proposed)

| Metric | Target (initial) |
|--------|------------------|
| Effort-estimate accuracy (actual ÷ estimate) | 0.85–1.15 |
| Specs requiring rework before build | ≤ 15% |
| Change orders traced to spec gaps | ≤ 10% |
| Feasibility turnaround for SC | ≤ 2 business days |

---

## 8. Controls, compliance & risk

- **Data/security by design:** specs flag credential handling, third-party system access, and NDA-gated data so delivery never exposes client systems.
- No build spec ships without explicit out-of-scope and acceptance criteria — this is the firm's defense against scope creep.
- Architecture honors the published stack (Next.js 14 static export, Tailwind, MHGSYNC) unless Exec approves a change.

---

## 9. Escalation & exceptions

Infeasible-as-sold scope → back to SC immediately (don't absorb silently). Platform limitations → Developer; if unresolvable, Exec for build-vs-buy.

---

## 10. Cadence

| Rhythm | Activity |
|--------|----------|
| Per deal | Feasibility on request; spec post-payment |
| Weekly | Design review with Dev + IS; change-control queue |
| Quarterly | Architecture/standards review |

---

## 11. Quick reference & open items

| Open item | Status |
|-----------|--------|
| Standard build-spec template | To formalize |
| MHGSYNC PM module (specs flow through it) | In build (Developer) |
| Reusable integration patterns library | To start |

**Contact:** hello@mhgstrategy.com · (925) 290-8604

---

## Revision history
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial Solutions Architect function SOP |
| 1.1 | June 2026 | Added tool-cost pass-through flagging to Finance/SC |
