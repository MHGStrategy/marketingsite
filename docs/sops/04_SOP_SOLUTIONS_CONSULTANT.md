# Solutions Consultant SOP

**Mikel Hunt Group Inc. DBA MHG Strategy** · Version 1.3 · Effective June 2026

> Describes the **closing function of the sales team**, not a person. Currently shared by both principals.
>
> **The Solutions Consultant owns the close — discovery through invoice trigger (A1.5–A3.5).** SDR owns A1, Finance owns A4, delivery owns A5. The full A1–A5 lifecycle and ownership map (from the retired Sales SOP) is preserved in §5 below.

---

## 1. Document control

| Field | Value |
|-------|-------|
| Function owner | Solutions Consultant |
| Current owner | Both principals (shared) |
| Approver | Executive Leadership |
| Version | 1.0 |
| Effective | June 2026 |
| Review cadence | Quarterly |

---

## 2. Purpose & scope

The Solutions Consultant takes a qualified opportunity and turns it into a signed, scoped, payable engagement — without overcommitting beyond what delivery and proof can support.

### Owns
- Discovery call (intake-driven agenda)
- Scope validation with the client (reviews MHGSYNC scope draft)
- RevOps tier conversation and proposal framing
- Agreement drafting/execution (Roller Land / Pyramid templates)
- **Invoice trigger** to Finance on agreement signature (A3.5)
- Warm handoff to delivery (via Solutions Architect) and, post-launch, to Account Manager

### Does not own
- Lead qualification/booking (SDR); technical design/feasibility (Solutions Architect); build (IS/Dev); invoice issuance and collection (Finance); pricing-floor authority (Exec).

---

## 3. Roles & responsibilities (RACI)

| Activity | SC | SDR | SA | Fin | Exec |
|----------|----|----|----|----|------|
| Discovery call | **R/A** | I | C | I | I |
| Scope validation | **R** | I | **C** | I | I |
| Pricing within floor | **R** | I | C (effort) | I | A (floor) |
| Discount below floor | R | I | I | I | **A** |
| Agreement execution | **R/A** | I | I | I | C (legal) |
| Invoice trigger | **R** | I | I | **A** | I |

---

## 4. Systems & tools

| System | Use |
|--------|-----|
| MHGSYNC discovery dashboard | Scope draft review |
| Intake responses (MHGSYNC) | Discovery agenda |
| Agreement templates | Roller Land (simple), Pyramid (complex/multi-system) |
| CRM | Opportunity stage, scope status, agreement/payment status |
| Cal.com | Discovery scheduling |
| Stripe (via Finance) | Triggers invoice; does not issue |

---

## 5. Core workflows

### Sales lifecycle (A1–A5) — ownership map

| Step | Name | Owner | Exit criteria |
|------|------|-------|---------------|
| **A1** | Intro call (~5 min) | SDR | Intake scheduled; NDA need assessed |
| **A1.5** | NDA (optional) | SC | Countersigned before sensitive-data exchange |
| **A2** | Intake + MHGSYNC scope | SC | Intake complete; scope reviewed internally |
| **A3** | Agreement countersigned | SC | Executed agreement on file |
| **A3.5** | Send invoice | SC → Finance | Invoice sent |
| **A4** | Payment received | Finance | **Hard gate** — project marked active |
| **A5** | Project kickoff | Implementation / delivery | Client notified; build begins |

**Hard rule:** no delivery begins until payment is confirmed (A4).

### 5.1 Discovery → scope (A1.5–A2)
1. Confirm NDA need (A1.5). Send the NDA **before intake** if the client will share any of: credentials or system access; financial records or proprietary business data; third-party environment data (Salesforce, ERP, accounting systems). Template: Pyramid Logistics NDA; default governing law Connecticut.
2. Run discovery off intake responses; validate scope, surface gaps, set agreement-timeline expectations.
3. Open the MHGSYNC scope draft; **review with the Solutions Architect** for complex/multi-system deals (feasibility, effort, technical boundaries) before presenting.

### 5.2 Proposal & pricing framing
Quote within the locked rate card (canonical source: **Finance §5.2**). Prices are floors; **quote at target, hold the floor as walk-away**. The only standing discount is 50% off WebOps for non-profits/churches/community activists — anything else needs Exec approval.

**WebOps tiers** — a value ladder, not one price:

| Tier | Positioning | Monthly | Onboarding |
|------|-------------|---------|------------|
| **WebOps GTM** | Simple build + updates | $600+ | — |
| **WebOps Growth** | Roadmap, CRO, SEO governance, reporting | $2,500+ | — |
| **WebOps Automation** | CRM integration, lead routing, automation (the bridge to RevOps) | $5,000+ | $5,000 |
| **Managed WebOps** | Full website ownership — **by qualification** | $10,000–15,000 | $10,000 |

Project builds over $1,500 follow **40% upfront (non-refundable) / 30% at 50% / 30% at 85%** (above ~$25k, switch to milestone billing — Finance §5.3).

**RevOps tiers** — quote at target:

| Tier | Positioning | Floor → Target | Onboarding |
|------|-------------|----------------|------------|
| **Consult** | Fractional strategist (advisory) | $2,500 → **$3,000/mo**; or $250/hr virtual, $500/hr in-person + travel rider | — |
| **RevOps** | Operator/admin | $5,000 → **$6,000/mo** + tool fees | $5,000 |
| **Automation** | Architect + builder (recommended) | $7,500 → **$10,000–12,000/mo** + tool fees | $10,000 |
| **Managed RevOps** | Outsourced department — capstone | $15,000 → **$18,000–25,000/mo** + tool fees | — |

**Tool fees** (AWS, Databricks, POS, CRM, etc.) pass through on top of the RevOps retainer — state this in the proposal so it isn't a first-invoice surprise. Managed tiers are the **expansion path after value is proven**, not a cold sell.

> **⚠️ Routing rule — OPEN (Exec decision pending):** WebOps Automation ($5k) and RevOps base ($6k) sell overlapping capability (CRM integration, lead routing, automation) at adjacent prices. Until Exec sets the rule, the working test is **website-led → WebOps Automation** (the site is the system of entry) vs. **revenue-system-led → RevOps** (CRM/pipeline is the system of record). Flag deals that sit on this seam.

### 5.3 Agreement & invoice trigger (A3–A3.5)
1. Draft from the right template. Key terms: explicit deliverables/timeline, 2 revision rounds standard, IP transfers on full payment (MHG retains portfolio rights), 10-business-day deemed acceptance, no invoice until fully executed.
2. On countersignature, **trigger Finance to invoice**. Do not begin delivery — Finance's A4 payment confirmation is the hard gate.
3. Hand the validated scope to the Solutions Architect to begin technical design once payment clears.

### 5.4 Handoffs
- **To Solutions Architect:** validated business scope + constraints.
- **To Finance:** invoice trigger + agreed terms/deposit.
- **To Account Manager:** at/after kickoff, full client context, expectations set, commercial relationship history.

---

## 6. Cross-team interfaces & dependencies

| We deliver to | What |
|---------------|------|
| Solutions Architect | Validated business scope and requirements |
| Finance | Invoice trigger (agreement signed) + terms/deposit |
| Account Manager | Warm client handoff with full deal context |
| Marketing | Win/loss themes, objection patterns |
| SDR | Disposition feedback on handoff quality |
| Executive Leadership | Forecast, win/loss, escalations |

| We receive from | What |
|-----------------|------|
| SDR | Qualified, booked opportunity with context |
| Solutions Architect | Feasibility, effort estimate, technical scope boundaries |
| MHGSYNC | Auto-generated scope draft |
| Executive Leadership | Pricing authority, discount approval |
| Finance | Payment confirmation (A4) before delivery starts |

---

## 7. KPIs & success metrics (proposed)

| Metric | Target (initial) |
|--------|------------------|
| Discovery → agreement (win rate) | ≥ 30% |
| Avg. days qualified → signed | ≤ 14 |
| Scope-accuracy (change orders per deal) | ≤ 1 |
| Discount frequency below floor | ≤ 20% of deals |
| Agreement → deposit-paid conversion | ≥ 90% |

---

## 8. Controls, compliance & risk

- **Hard rule:** no delivery before payment confirmed (A4). The SC triggers the invoice; the SC does not start the build.
- No invoice before the agreement is fully executed.
- Do not overclaim — positioning in the deal must match available proof (no case studies yet). Credibility filter applies to verbal claims too.
- NDA before sensitive-data exchange.

---

## 9. Escalation & exceptions

Discount/scope/legal exceptions → Exec (L3). Feasibility disputes → Solutions Architect, then Exec. Payment-gate exceptions are **not** the SC's to waive — Finance + Exec only.

---

## 10. Cadence

| Rhythm | Activity |
|--------|----------|
| Daily | Advance live opportunities; prep discovery from intake |
| Weekly | Pipeline review with SDR + delivery; scope drafts awaiting review |
| Monthly | Win/loss analysis to Marketing + Exec |

---

## 11. Quick reference & open items

| Open item | Status |
|-----------|--------|
| Tiered rate card (WebOps + RevOps) | **Locked (Finance §5.2)** |
| WebOps Automation vs RevOps routing rule | **Exec decision pending** |
| RevOps "fractional" framing page for inbound deals | Pending Marketing build |
| Sales SOP retired; lifecycle + NDA folded into SC, capture detail into SDR | **Done** |

**Contact:** hello@mhgstrategy.com · (925) 290-8604

---

## Revision history
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial Solutions Consultant function SOP (split from Sales) |
| 1.1 | June 2026 | Added confirmed rate card to tier framing; tool-fee pass-through expectation |
| 1.2 | June 2026 | Locked full WebOps + RevOps tier ladders, floor/target, onboarding; flagged routing seam |
| 1.3 | June 2026 | Folded in A1–A5 lifecycle ownership map and NDA rules from retired Sales SOP |
