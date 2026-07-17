# SDR (Sales Development) SOP

**Mikel Hunt Group Inc. DBA MHG Strategy** · Version 1.3 · Effective June 2026

> Describes the **sales development function**, not a person. Currently shared by both principals.
>
> **Sales is split into SDR (this doc — prospect, qualify, route, book / A1) and Solutions Consultant (close / A1.5–A3.5).** This SOP is the self-contained source of truth for the top of funnel; the retired Sales SOP's lead-capture detail (source matrix, intake routing, offers funnel, booking URLs, CRM schema) is preserved in §5.4–5.7 below.

---

## 1. Document control

| Field | Value |
|-------|-------|
| Function owner | SDR |
| Current owner | Both principals (shared) |
| Approver | Executive Leadership |
| Version | 1.0 |
| Effective | June 2026 |
| Review cadence | Quarterly |

---

## 2. Purpose & scope

SDR is the firm's first human touch: it works outbound lists and inbound forms, qualifies for fit, routes to the right front door, and hands a booked, context-rich opportunity to the Solutions Consultant.

### Owns
- Outbound prospecting against the ICP
- Inbound lead qualification (the ~5-minute intro call, A1)
- Routing: WebOps vs. RevOps vs. not-a-fit
- Booking discovery and confirming intake is started
- Lead hygiene at top of funnel (CRM rows accurate and dispositioned)

### Does not own
- Discovery depth, scope, pricing, or close (Solutions Consultant); content/MQL generation (Marketing); invoicing (Finance).

---

## 3. Roles & responsibilities (RACI)

| Activity | SDR | SC | Mktg | Exec |
|----------|-----|----|----|------|
| Outbound prospecting | **R** | I | C (content) | A (ICP) |
| Inbound qualification (A1) | **R** | I | I | I |
| Routing decision | **R/A** | C | I | I |
| Booking discovery | **R** | C | I | I |
| Opportunity handoff to SC | **R** | **A (accept)** | I | I |

---

## 4. Systems & tools

| System | Use |
|--------|-----|
| MHGSYNC | Intake CRM — dashboards, scope, pipeline (system of record) |
| Web_Leads spreadsheet | Assessment capture + SDR disposition ([architecture](../processes/LEAD_PIPELINE.md)) |
| Apps Script leads endpoint | Inbound form → sheet row + notifications (`hello@mhgstrategy.com`) |
| Cal.com | `webops-discovery`, `revops-review` booking |
| Email | Outbound + confirmation follow-up |
| Lead source matrix (§5.4) | Source → tab → routing reference |

---

## 5. Core workflows

### 5.1 Inbound qualification (A1)
1. New lead notification hits `hello@mhgstrategy.com` and lands on its source tab.
2. Respond within SLA (below). Run the ~5-min intro: company, contact, current stack, reason for reaching out, intake meeting time, **NDA need: Yes/No/TBD**.
3. Confirm fit and route: **WebOps** (website, hosting, CMS, SEO), **RevOps** (pipeline, CRM, reporting, integrations), or **not a fit** (refer elsewhere — do not force intake).
   - **Budget sanity check** (canonical: Finance §5.2): WebOps starts at **$600/mo** (Growth $2,500+, Automation $5,000+); RevOps retainers start at **$5,000/mo + tool fees** (Automation $7,500+, Managed $15,000+). A prospect far below the relevant floor is a routing/expectation flag for the SC, not a hard disqualifier.
4. Ensure intake link is sent and discovery is booked; disposition the CRM row.

### 5.2 Outbound prospecting
1. Build target lists against the ICP (Exec-defined).
2. Sequence outreach using Marketing content; log activity in CRM.
3. On a positive reply, run the same A1 qualification and route.

### 5.3 Handoff to Solutions Consultant
A qualified opportunity is "accepted" by SC only when it carries: company, contact, front door (WebOps/RevOps), stack, stated need, booked discovery time, and NDA flag. Incomplete handoffs bounce back to SDR.

### Response SLA

| Priority | Trigger | Action |
|----------|---------|--------|
| High | Claim-offer submitted | Call within 24 business hours |
| High | Qualified free-site offer sent | Follow up if unclaimed within 48 hours |
| Standard | WebOps / RevOps / Managed Ops form | Same business day |
| Standard | Cal.com booking | Confirm intake link sent |

### 5.4 Lead source matrix & booking URLs

All form submissions flow through the Apps Script leads endpoint → Google Sheets → email to `hello@mhgstrategy.com`.

| Entry point | URL | Form source | Sheet tab | Internal email subject |
|-------------|-----|-------------|-----------|------------------------|
| Contact triage hub | `/contact/` | (routes to vertical forms) | — | — |
| WebOps assessment | `/webops/#contact` | `webops-assessment` | `webops` | New WebOps assessment — … |
| RevOps review | `/revops/#lead-form` | `revops-review` | `revops` | New RevOps review — … |
| Managed Ops review | `/managed-ops/#lead-form` | `managed-ops-review` | `revops` | New Managed Ops review — … |
| MHG Media | `/mhgmedia/` | `mhgmedia` | `MHG_New_Leads` | New lead — mhgmedia |
| Offers eligibility | `/webops/offers/` | `offers` | `Offers` | New offers eligibility — qualified/not qualified |
| Claim offer | `/webops/claimoffer/` | `claimoffer` | `Claimed` | New Offer Claim Request |
| WebOps intake (completed) | `/webops/intake/*`, `/webservices/intake/*` | `webops-intake` | `webops_intake` | New WebOps intake — … |
| RevOps intake (completed) | `/intake/` | `revops-intake` | `revops_intake` | New RevOps intake — … |
| Engagement assessment | (form built; page not live) | `engagement-assessment` | `Contact` | New engagement assessment — … |
| Direct booking | `/book/`, `/book/webops/`, `/book/revops/` | Cal.com | — | Calendar notification |

**Cal.com booking URLs** (keep in sync with `.env.local` and Apps Script constants):

| Line | URL |
|------|-----|
| WebOps | `https://cal.com/mhgstrategy/webops-discovery` |
| RevOps | `https://cal.com/mhgstrategy/revops-review` |
| Managed Ops | `https://cal.com/mhgstrategy/scrum-call` |

On-site booking pages: `/book/webops/`, `/book/revops/`.

### 5.5 Intake routing

After a form submits, the confirmation email sends the correct intake link (WebOps industry selection pre-selects the URL). Confirm intake is started before the discovery call.

**WebOps vertical intake** — `mhgstrategy.com/webops/intake/<vertical>/`:

| Vertical | Path | Vertical | Path |
|----------|------|----------|------|
| Ministry | `/ministry/` | Catering | `/catering/` |
| Ecommerce | `/ecommerce/` | Consulting & Coaching | `/consulting/` |
| Real Estate | `/real-estate/` | Beauty & Wellness | `/beauty-wellness/` |
| Logistics | `/logistics/` | Accounting & Bookkeeping | `/accounting/` |
| Storefront Entertainment | `/storefront-entertainment/` | Home Services | `/home-services/` |
| Junk Removal | `/junk-removal/` | Restaurant | `/restaurant/` |
| Warehousing | `/warehousing/` | General Business (default) | `/general-business/` |
| Insurance | `/insurance/` | | |

**RevOps / Managed Ops intake** — generic discovery form at `mhgstrategy.com/intake/` (`formType: discovery`). Intake forms POST to the MHGSYNC intake API; on success MHGSYNC generates the personalized discovery dashboard and surfaces the scope draft for SC/SA review.

**Completed intake tracking (SDR ops layer).** After a successful MHGSYNC submission, the site appends a best-effort row to the Web_Leads spreadsheet — same spreadsheet as assessment forms:

| Intake path | Sheet tab | `Form Source` |
|-------------|-----------|---------------|
| `/webops/intake/*`, `/webservices/intake/*` | `webops_intake` | `webops-intake` |
| `/intake/` | `revops_intake` | `revops-intake` |

MHGSYNC remains the system of record (full `formData`, 5-digit dashboard ID, dashboard email). The sheet row is for SDR tracking only — confirm intake completed, dashboard ID/URL, response counts, and upsell signals before the discovery call. Apps Script also sends the client a thank-you email with a Cal.com booking link if they have not scheduled yet.

### 5.6 Offers campaign funnel

Promotional funnel for new/small businesses (Marketing owns the creative; SDR acts on the leads): `mhgstrategy.com/webops/offers/`.

**Eligibility → offer code.** Prospect submits project type, primary goal, launch timeline, email. Qualification logic (Apps Script):

| Qualifies for `FREE_SITE` | Does not qualify |
|---------------------------|------------------|
| New business OR existing business with no website | Existing site needing rebuild |
| Goal: credibility OR info only | Goal: generate leads |
| Launch: ASAP OR within 30 days | Launch: 1–3 months |

| Outcome | Offer type | Client email |
|---------|------------|--------------|
| Qualified | `FREE_SITE` | Offer code + claim link (`offerType=FREE_SITE`) |
| Not qualified | `HALF_OFF_90_DAYS` | Offer code + 50% off hosting for 90 days |

Offer codes expire **90 days** from issuance; rows logged on the `Offers` tab.

**Claim** — `/webops/claimoffer/` (code prefilled from the email URL). Captures name, offer code, phone, best time to call, business details → `Claimed` tab → internal `New Offer Claim Request`. **SDR action:** call to confirm fit, then route into standard A1 (the intro can merge with this call if already scheduled).

### 5.7 CRM hygiene & schema

One spreadsheet, one tab per source — assessment tabs plus intake mirror tabs (`webops_intake`, `revops_intake`). MHGSYNC owns completed intakes; the sheet is the SDR ops layer. Monitor `hello@mhgstrategy.com` and the sheet daily. Columns to track per lead:

Lead date · Source/form · Company + contact · Vertical (WebOps industry or RevOps) · Intake completed (Y/N) · Call booked (Y/N) · Scope reviewed (Y/N) · Agreement status · Invoice/payment status · Owner.

**Email failures:** if a client confirmation email fails, check the `Email_Errors` tab and re-run Gmail authorization on the Apps Script endpoint (Developer owns the fix).

---

## 6. Cross-team interfaces & dependencies

| We deliver to | What |
|---------------|------|
| Solutions Consultant | Qualified, booked opportunity with full context |
| Marketing | Lead-quality feedback, objection intel, disposition data |
| Executive Leadership | Top-of-funnel pipeline volume |
| Developer | CRM/lead-form bug and feature requests |

| We receive from | What |
|-----------------|------|
| Marketing | MQLs, campaign context, outreach content |
| Executive Leadership | ICP definition, quota/targets |
| Developer | Working CRM, lead endpoint, booking links |

---

## 7. KPIs & success metrics (proposed)

| Metric | Target (initial) |
|--------|------------------|
| Speed-to-lead (inbound) | < 1 business hour |
| Lead → qualified rate | ≥ 40% |
| Qualified → discovery booked | ≥ 70% |
| SC acceptance rate of handoffs | ≥ 90% |
| Outbound replies per week | Trend up |

---

## 8. Controls, compliance & risk

- Never force intake on a non-fit; mis-routing pollutes downstream scope and erodes close rates.
- CRM disposition is mandatory — an undispositioned lead is an invisible leak.
- Capture NDA flag at A1 so the Solutions Consultant doesn't share or request sensitive data prematurely.

---

## 9. Escalation & exceptions

Ambiguous fit → consult SC before routing. Volume spikes beyond SLA capacity → Exec for triage priority.

---

## 10. Cadence

| Rhythm | Activity |
|--------|----------|
| Daily | Work inbound queue to SLA; outbound touches; disposition rows |
| Weekly | Funnel review with SC; lead-quality feedback to Marketing |
| Monthly | List refresh; sequence performance review |

---

## 11. Quick reference & open items

| Open item | Status |
|-----------|--------|
| Formal handoff checklist in MHGSYNC | To build |
| Lead pipeline reference | [LEAD_PIPELINE.md](../processes/LEAD_PIPELINE.md) |
| Top-of-funnel operational reference (ex-Sales SOP) | **Folded into §5.4–5.7** |

**Contact:** hello@mhgstrategy.com · (925) 290-8604

---

## Revision history
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 2026 | Initial SDR function SOP (split from Sales) |
| 1.1 | June 2026 | Added budget-fit qualifier referencing rate floors |
| 1.2 | June 2026 | Updated budget qualifier to locked tier floors |
| 1.3 | June 2026 | Folded in lead-source matrix, intake routing, offers funnel, booking URLs, CRM schema from retired Sales SOP |
