# MHG Strategy — SEO Discovery Audit

**Date:** July 16, 2026  
**Scope:** Organic-search readiness for all indexable marketing pages  
**Method:** Read-only review of source metadata, built static export (`out/`), component trees, and `app/sitemap.ts`  
**Site:** https://mhgstrategy.com (Next.js 14 static export)

---

## Executive Summary

The site has a solid SEO foundation: centralized `buildPageMetadata()`, correct self-referencing canonicals on all 18 indexable pages, and no money pages accidentally set to `noindex`. Primary gaps for organic search are **title/description copy** (heavy internal jargon, several descriptions over 160 characters), **image weight** (multiple multi-MB PNGs; hero is 724 KB), and **internal linking** (insight posts are only reachable from the `/insights/` hub — no service-page cross-links). Heading structure is generally good (one H1 per page) with minor semantic exceptions on `/managed-ops/` and `/contact/`.

---

## 1. Title Tags & Meta Descriptions

**Source:** `buildPageMetadata()` calls in page/layout files and content modules under `lib/content/`.  
**Flag legend:**
- **JARGON** — title uses internal/product language unlikely to match search queries (e.g. "WebOps", "RevOps", "AI-Powered Ops")
- **LONG** — description > 160 characters (may truncate in SERPs)
- **SHORT** — description < 70 characters (thin snippet)

| Route | Title | Description | Chars | Flags |
|-------|-------|-------------|------:|-------|
| `/` | MHG Strategy \| AI-Powered Ops | AI-powered operations for your website and revenue engine. We build it, host it, run it, and watch it — so you never have to. | 125 | JARGON |
| `/about/` | About Us — MHG Strategy | MHG Strategy was built by operators who saw the gap firsthand — between what businesses are capable of and what their operations actually deliver. We build, run, and stay accountable to the systems that close it. | 212 | LONG |
| `/solutions/` | Solutions \| MHG Strategy | AI-powered web operations and revenue operations. We run your website and fix your revenue engine so you can focus on growth. | 125 | JARGON |
| `/webops/` | WebOps \| MHG Strategy | Managed website operations — build, hosting, and ongoing support. WebOps tiers from $600/month with automation and managed digital operations. | 142 | JARGON |
| `/revops/` | RevOps \| MHG Strategy | Govern and scale your revenue engine — pipeline, CRM, GTM systems, and automation scoped to your operation. | 107 | JARGON |
| `/managed-ops/` | Managed Ops \| MHG Strategy | Transform and run your operations end-to-end — AI readiness assessment, transformation execution, managed AI operations, and full ownership packages. | 149 | JARGON |
| `/portfolio/` | Portfolio \| WebOps Client Sites \| MHG Strategy | Portfolio showcase: custom websites MHG Strategy designs, builds, and manages for clients across recreation, ministry, nonprofit, community, and retail. | 152 | JARGON |
| `/contact/` | Contact \| MHG Strategy | Get in touch with MHG Strategy for WebOps, RevOps, or a discovery call. Choose the option that best fits your needs. | 116 | JARGON |
| `/book/` | Book a Call \| MHG Strategy | Schedule a discovery call with MHG Strategy for WebOps or RevOps support. | 73 | JARGON |
| `/book/webops/` | Book a WebOps Call \| MHG Strategy | Schedule a WebOps discovery call with MHG Strategy. | 51 | JARGON, SHORT |
| `/book/revops/` | Book a RevOps Call \| MHG Strategy | Schedule a RevOps review call with MHG Strategy. | 48 | JARGON, SHORT |
| `/insights/` | Insights \| MHG Strategy | Practical guides and resources on AI, automation, and building skills for the future workforce — from MHG Strategy. | 115 | JARGON |
| `/insights/ai-ready-data/` | The Gap Between "We Want AI" and "Our Data Can Support It" \| MHG Strategy | Almost every AI engagement starts with a gap — the company wants AI, but the data can't safely support it yet. Demos work; production doesn't. Here's what AI-ready actually means. | 179 | LONG |
| `/insights/define-the-workload/` | Don't Pick the Platform Before You Define the Workload \| MHG Strategy | The most expensive stack is the one you rebuild. Platform choices made before naming your workload lead to migrations that cost far more than the original build. | 161 | LONG |
| `/insights/excel-to-saas/` | Spreadsheets Feel Free. They're Costing You Speed and Good Decisions. \| MHG Strategy | Almost every company runs something important on a spreadsheet. It worked with three people and one tab — now there are thirty people, forty tabs, and nobody knows which copy is real. | 183 | LONG |
| `/insights/learn-claude-ai-high-school/` | Learn Claude AI for High School Students \| MHG Strategy | A free 6–12 month AI training plan for high school students and teachers. Learn Claude, earn certificates, and build real skills before graduation. From MHG Strategy. | 166 | LONG |
| `/webops/lifecycle/` | Web Services Lifecycle \| MHG Strategy | How MHG Strategy engages Web Services clients — from intro call through delivery, agreement, invoicing, and ongoing maintenance. | 128 | JARGON |
| `/webops/bluehost/` | Bluehost Setup Guide \| MHG Strategy | Step-by-step instructions to sign up for Bluehost Shared hosting and add MHG Strategy as an admin so we can build your website. | 127 | — |

### Title jargon — recommended search-language alternatives (proposals only)

| Current title pattern | Issue | Search-language direction |
|-----------------------|-------|---------------------------|
| `WebOps \| MHG Strategy` | Brand jargon, not how buyers search | "Managed Website Operations" or "Website Management Services" |
| `RevOps \| MHG Strategy` | Acronym-heavy | "Revenue Operations Consulting" or "CRM & Pipeline Operations" |
| `Managed Ops \| MHG Strategy` | Vague | "Managed Business Operations" or "AI Operations Management" |
| `Solutions \| MHG Strategy` | Generic | "Web & Revenue Operations Services" |
| `Insights \| MHG Strategy` | Generic | "Business Operations Blog" or "AI & Operations Guides" |
| `MHG Strategy \| AI-Powered Ops` | Tagline jargon on homepage | Lead with service outcome, e.g. "Managed Website & Revenue Operations" |
| `Web Services Lifecycle \| …` | Internal process doc naming | "How We Work With Web Clients" (if page stays public) |
| `Book a WebOps/RevOps Call \| …` | Acronyms in booking titles | "Book a Website Strategy Call" / "Book a Revenue Ops Call" |

### Description length summary

| Status | Count | Routes |
|--------|------:|--------|
| Over 160 chars | 6 | `/about/`, 4 insight posts, `/insights/define-the-workload/` (161) |
| Under 70 chars | 2 | `/book/webops/`, `/book/revops/` |
| In range (70–160) | 10 | Remaining indexable pages |

**Note:** Insight post titles are strong for organic search (problem-oriented, natural language). Meta descriptions for those posts reuse post excerpts and run long — trim for SERP display while keeping titles as-is.

---

## 2. Canonical & Robots Integrity

**Implementation:** `lib/seo/siteMetadata.ts` → `buildPageMetadata()` sets `alternates.canonical` via `absoluteUrl(path)`. Root layout (`rootMetadata`) sets default `robots: { index: true, follow: true }`. Pages using `buildPageMetadata()` without `noIndex: true` inherit indexable behavior.

**Verified in built HTML (`out/`):**

| Route | Expected canonical | Actual canonical | Robots |
|-------|-------------------|------------------|--------|
| `/` | `https://mhgstrategy.com/` | ✅ Match | `index, follow` |
| `/about/` | `https://mhgstrategy.com/about/` | ✅ Match | `index, follow` |
| `/solutions/` | `https://mhgstrategy.com/solutions/` | ✅ Match | `index, follow` |
| `/webops/` | `https://mhgstrategy.com/webops/` | ✅ Match | `index, follow` |
| `/revops/` | `https://mhgstrategy.com/revops/` | ✅ Match | `index, follow` |
| `/managed-ops/` | `https://mhgstrategy.com/managed-ops/` | ✅ Match | `index, follow` |
| `/portfolio/` | `https://mhgstrategy.com/portfolio/` | ✅ Match | `index, follow` |
| `/contact/` | `https://mhgstrategy.com/contact/` | ✅ Match | `index, follow` |
| `/book/` | `https://mhgstrategy.com/book/` | ✅ Match | `index, follow` |
| `/book/webops/` | `https://mhgstrategy.com/book/webops/` | ✅ Match | `index, follow` |
| `/book/revops/` | `https://mhgstrategy.com/book/revops/` | ✅ Match | `index, follow` |
| `/insights/` | `https://mhgstrategy.com/insights/` | ✅ Match | `index, follow` |
| `/insights/ai-ready-data/` | `https://mhgstrategy.com/insights/ai-ready-data/` | ✅ Match | `index, follow` |
| `/insights/define-the-workload/` | `https://mhgstrategy.com/insights/define-the-workload/` | ✅ Match | `index, follow` |
| `/insights/excel-to-saas/` | `https://mhgstrategy.com/insights/excel-to-saas/` | ✅ Match | `index, follow` |
| `/insights/learn-claude-ai-high-school/` | `https://mhgstrategy.com/insights/learn-claude-ai-high-school/` | ✅ Match | `index, follow` |
| `/webops/lifecycle/` | `https://mhgstrategy.com/webops/lifecycle/` | ✅ Match | `index, follow` |
| `/webops/bluehost/` | `https://mhgstrategy.com/webops/bluehost/` | ✅ Match | `index, follow` |

### Findings

| Check | Result |
|-------|--------|
| Money pages accidentally `noindex` | **None found.** All 18 indexable routes are `index, follow`. |
| Canonical pointing to wrong URL | **None found** among indexable pages. |
| Redirect pages (non-indexable) | Correctly use `buildRedirectMetadata()` → `noindex, follow` + canonical to **target** URL (e.g. `/finops/` → canonical `/solutions/`). |
| Private intake forms | Correctly `noindex, nofollow` via layout metadata; also disallowed in `robots.txt`. |

### Non-indexable routes confirmed safe (not money pages)

| Route | Robots | Notes |
|-------|--------|-------|
| `/intake/`, `/webops/intake/*`, `/webservices/intake/*` | `noindex, nofollow` | Client forms |
| `/webops/1s/` | `noindex, nofollow` | Sales landing |
| `/scrapped/` | `noindex, nofollow` | Archived; excluded from deploy |
| `/v1/` | `noindex, follow` | Legacy redirect |
| `/404` | `noindex, follow` | Not found |

---

## 3. Image Weight (Core Web Vitals)

### All files in `public/uploads/`

| File | Size (KB) | Flag (>200 KB) |
|------|----------:|:--------------:|
| `datalines.png` | 3,984 | ⚠️ |
| `Painted-Earth.png` | 2,736 | ⚠️ |
| `computer-dive.png` | 1,904 | ⚠️ |
| `mhgstrategy_win_more_clients.png` | 1,384 | ⚠️ |
| `mhgstrategy_revenue_ring.png` | 1,260 | ⚠️ |
| `mhgstrategy_visualize_what_matters.png` | 1,076 | ⚠️ |
| `mhgstrategyhero.png` | 724 | ⚠️ |
| `mhgmediagroupLOGO.png` | 376 | ⚠️ |
| `mhgstrategy_expect_more.png` | 180 | — |
| `poweredcity.png` | 116 | — |
| `webops.png` | 84 | — |
| `.DS_Store` | 8 | (not served intentionally) |

**11 of 12 image assets exceed 200 KB.** Total upload weight ≈ **12.8 MB**.

Default OG image (`DEFAULT_OG_IMAGE` in `lib/seo/siteMetadata.ts`) also points to `mhgstrategyhero.png` (724 KB) — heavy for social crawlers.

### LCP candidates (above-the-fold)

| Page | LCP element | URL | Size | Notes |
|------|-------------|-----|-----:|-------|
| `/` (homepage) | Hero section CSS `background-image` (`HomePageDefault`, 70vh) | `/uploads/mhgstrategyhero.png` | 724 KB | Primary LCP candidate |
| `/` (homepage) | Nav logo `<img>` (all pages via `Navigation.tsx`) | `/mhg-logo.png` | *(not in uploads/)* | Secondary above-fold asset |
| `/webops/` | Hero CSS background (`WebOpsLandingPage`, 70vh) | `/uploads/mhgstrategyhero.png` | 724 KB | Same asset as homepage |
| `/revops/` | Hero CSS background (`VerticalPage`, 70vh) | `/uploads/mhgstrategyhero.png` | 724 KB | Same asset as homepage |

**Below-fold on homepage only** (lazy-loaded pathway cards):
- `/uploads/mhgstrategy_win_more_clients.png` — 1,384 KB
- `/uploads/mhgstrategy_visualize_what_matters.png` — 1,076 KB

**CWV risk:** Identical 724 KB hero PNG on three money pages; homepage also loads 2.5 MB of lazy card images on scroll. `datalines.png`, `Painted-Earth.png`, and `computer-dive.png` are referenced in `lib/media/assets.ts` but not used as LCP on the three pages above — still dead weight if linked elsewhere.

---

## 4. Internal Linking Map

**Convention:** Site-wide chrome (`Navigation`, `FooterNav`, `Footer`) appears on every indexable page. Links below list **page-specific** links plus chrome. Hash-only links noted separately.

### Site-wide chrome (every indexable page)

| Source | Internal links |
|--------|----------------|
| `Navigation.tsx` | `/`, `/solutions`, `/webops`, `/revops`, `/about`, `/contact`, `/insights` |
| `FooterNav.tsx` | Same as nav |
| `Footer.tsx` | `/webops/` (copyright line) |

---

### Per-page internal links

#### `/`
| Target | Context |
|--------|---------|
| `/webops/` | Service pathway CTA |
| `/revops/` | Service pathway CTA |
| `/contact/` | Final CTA |
| *(chrome)* | `/`, `/solutions`, `/webops`, `/revops`, `/about`, `/contact`, `/insights` |

#### `/about/`
| Target | Context |
|--------|---------|
| `/webops` | Practice card |
| `/revops` | Practice card |
| `/managed-ops` | Managed Ops card |
| `/contact` | Primary CTA |
| `/solutions` | Secondary CTA |
| *(chrome)* | — |

#### `/solutions/`
| Target | Context |
|--------|---------|
| `/webops/` | WebOps card CTA |
| `/revops/` | RevOps card CTA |
| `/managed-ops/` | Managed Ops card CTA |
| `/contact/` | Bottom CTA |
| *(chrome)* | — |

#### `/webops/`
| Target | Context |
|--------|---------|
| `/book/webops/` | Secondary CTA; tier card CTAs (when Cal configured) |
| `#contact` | Hero + default tier CTAs (hash) |
| *(chrome)* | — |

#### `/revops/`
| Target | Context |
|--------|---------|
| `#lead-form` | Hero CTA + form section (hash) |
| `/book/revops/` | Dynamic (when Cal configured) |
| `/intake/` | Form success redirect (dynamic) |
| *(chrome)* | — |

#### `/managed-ops/`
| Target | Context |
|--------|---------|
| `#lead-form` | Hero CTA + form section (hash) |
| `/book/revops/` | Dynamic Cal CTA (when configured) |
| `/intake/` | Form success redirect (dynamic) |
| *(chrome)* | — |

**Gap:** No inline links to `/webops/`, `/revops/`, `/solutions/`, `/insights/`, or sibling services.

#### `/portfolio/`
| Target | Context |
|--------|---------|
| `/webops/` | Intro link, slider CTA, bottom CTA |
| `/contact` | Bottom CTA |
| *(chrome)* | — |

#### `/contact/`
| Target | Context |
|--------|---------|
| `/webops/#contact` | Website help card |
| `/revops/#lead-form` | RevOps help card |
| `/book/` | Schedule call card |
| *(chrome)* | — |

#### `/book/`, `/book/webops/`, `/book/revops/`
| Target | Context |
|--------|---------|
| `/book/webops/` | Type selector |
| `/book/revops/` | Type selector |
| `/webops/#contact` or `/revops/#lead-form` | Fallback link (depends on active type) |
| *(chrome)* | — |

#### `/insights/`
| Target | Context |
|--------|---------|
| `/insights/ai-ready-data` | Post card (×2) |
| `/insights/define-the-workload` | Post card (×2) |
| `/insights/excel-to-saas` | Post card (×2) |
| `/insights/learn-claude-ai-high-school` | Post card (×2) |
| `/contact` | Hub CTA |
| *(chrome)* | — |

#### `/insights/ai-ready-data/`
| Target | Context |
|--------|---------|
| `/revops` | Article end CTA ("Explore RevOps") |
| `/insights` | Back link |
| *(chrome)* | — |

#### `/insights/define-the-workload/`
| Target | Context |
|--------|---------|
| `/revops` | Article end CTA |
| `/insights` | Back link |
| *(chrome)* | — |

#### `/insights/excel-to-saas/`
| Target | Context |
|--------|---------|
| `/webops` | Article end CTA |
| `/insights` | Back link |
| *(chrome)* | — |

#### `/insights/learn-claude-ai-high-school/`
| Target | Context |
|--------|---------|
| `/insights` | Back link |
| `#curriculum`, `#educators`, etc. | In-page nav (hash only) |
| *(chrome)* | — |

**Gap:** No CTA to a service page; only educational content + back to hub.

#### `/webops/lifecycle/`
| Target | Context |
|--------|---------|
| `/webops/intake/` + 15 industry slugs | Intake vertical links |
| `/webops/bluehost/` | Related tools |
| *(chrome)* | — |

**Note:** Links to `/webops/intake/*` routes that are `noindex` — fine for client workflow, weak for SEO equity flow.

#### `/webops/bluehost/`
| Target | Context |
|--------|---------|
| `/contact/` | Help / done section |
| *(chrome)* | — |

---

### (a) Insight post orphan analysis

| Post slug | Inbound links from other indexable pages |
|-----------|------------------------------------------|
| `ai-ready-data` | `/insights/` hub only |
| `define-the-workload` | `/insights/` hub only |
| `excel-to-saas` | `/insights/` hub only |
| `learn-claude-ai-high-school` | `/insights/` hub only |

**Verdict:** Not true orphans (hub links to all four), but **deep orphans** — no service page, homepage, about page, or cross-post links point to individual posts. Crawlers and users only discover posts via `/insights/` or direct URL/sitemap.

---

### (b) Missing cross-links — proposed additions (not implemented)

| Source page | Target page | Suggested anchor text | Rationale |
|-------------|-------------|----------------------|-----------|
| `/revops/` | `/insights/ai-ready-data/` | "Is your data ready for AI?" | Post CTA already points to RevOps; reciprocal link strengthens topical cluster |
| `/revops/` | `/insights/define-the-workload/` | "Define the workload before picking tools" | RevOps/platform architecture alignment |
| `/managed-ops/` | `/insights/ai-ready-data/` | "What AI-ready data actually means" | Managed Ops sells AI readiness; post is directly relevant |
| `/managed-ops/` | `/insights/define-the-workload/` | "Don't rebuild your stack twice" | Transformation / architecture theme |
| `/webops/` | `/insights/excel-to-saas/` | "When spreadsheets stop scaling" | Post CTA already points to WebOps |
| `/solutions/` | `/insights/` | "Read our latest operations guides" | Hub page has no link to content marketing |
| `/` | `/insights/` | "Ideas to move faster" | Homepage has no content discovery path |
| `/about/` | `/insights/` | "Practical guides from our team" | About page establishes expertise but doesn't link to proof content |
| `/insights/ai-ready-data/` | `/managed-ops/` | "Explore managed operations" | Second CTA alongside existing `/revops` link for AI-readiness buyers |
| `/insights/define-the-workload/` | `/managed-ops/` | "See how we run transformations" | Workload/platform post fits Managed Ops better than RevOps alone |
| `/insights/learn-claude-ai-high-school/` | `/about/` | "About MHG Strategy" | Educational post has no brand/service path for non-student readers |
| `/portfolio/` | `/insights/excel-to-saas/` | "Why we build beyond spreadsheets" | Portfolio implies custom builds; relevant ops content |
| `/webops/lifecycle/` | `/webops/` | "Back to WebOps services" | Process doc doesn't link up to money page |
| `/webops/bluehost/` | `/webops/` | "Learn about our WebOps plans" | Setup guide is top-of-funnel; should funnel to service page |

---

## 5. Sitemap & Headings

### Sitemap coverage (`app/sitemap.ts`)

**Indexable pages (18 total):**

| # | Route | In sitemap? |
|---|-------|:-----------:|
| 1 | `/` | ✅ |
| 2 | `/webops/` | ✅ |
| 3 | `/revops/` | ✅ |
| 4 | `/managed-ops/` | ✅ |
| 5 | `/solutions/` | ✅ |
| 6 | `/portfolio/` | ✅ |
| 7 | `/about/` | ✅ |
| 8 | `/contact/` | ✅ |
| 9 | `/book/` | ✅ |
| 10 | `/book/webops/` | ✅ |
| 11 | `/book/revops/` | ✅ |
| 12 | `/webops/lifecycle/` | ✅ |
| 13 | `/webops/bluehost/` | ✅ |
| 14 | `/insights/` | ✅ |
| 15 | `/insights/ai-ready-data/` | ✅ (+ `lastmod`) |
| 16 | `/insights/define-the-workload/` | ✅ (+ `lastmod`) |
| 17 | `/insights/excel-to-saas/` | ✅ (+ `lastmod`) |
| 18 | `/insights/learn-claude-ai-high-school/` | ✅ (+ `lastmod`) |

**Result:** All indexable pages are in the sitemap. ✅

### Noindex pages — sitemap leak check

| Route | noindex? | In sitemap? |
|-------|:--------:|:-----------:|
| `/intake/` | ✅ | ❌ (removed) |
| `/webops/intake/*` | ✅ | ❌ |
| `/webservices/intake/*` | ✅ | ❌ |
| `/webops/1s/` | ✅ | ❌ |
| `/scrapped/` | ✅ | ❌ |
| `/app/*` | — | ❌ |
| `/v1/` | ✅ | ❌ |
| Redirect routes (`/finops/`, etc.) | ✅ | ❌ |

**Result:** No `noindex` pages leak into the sitemap. ✅

### Heading structure spot-check

| Route | H1 count | H1 text | H2 structure | Exceptions |
|-------|:--------:|---------|--------------|------------|
| `/` | 1 | "Most Businesses Are Running on Manual. We Fix That." | Capabilities, pathway chooser, help sections | — |
| `/about/` | 1 | "We're Operators. Not Consultants." | Origin, beliefs, gap, principles, services, audience, CTA | — |
| `/solutions/` | 1 | "Two ways we help businesses grow." | WebOps, RevOps, Managed Ops cards, CTA | — |
| `/webops/` | 1 | "Digital Infrastructure for Serious Businesses" | Tiers section + tier card headings | Tier cards use H2 for pricing tiers — acceptable |
| `/revops/` | 1 | "Govern and scale your revenue engine." | Automated RevOps, lead form | — |
| `/managed-ops/` | 1 | "One team. Your whole operation." | Lead form H2 only | ⚠️ "How it works" and "What's included" use `<p>` labels, not H2 — skipped heading level |
| `/portfolio/` | 1 | "Work that speaks for itself" | Slider section, CTA section | — |
| `/contact/` | 1 | "What do you need help with?" | Three option cards as H2 | Card titles are H2 (reasonable for layout) |
| `/book/*` | 1 | "Book a call" | Active booking type label as H2 | — |
| `/insights/` | 1 | "Ideas That Help You Move Faster" | Post titles as H2 + CTA H2 | Post titles duplicated as linked H2s — acceptable for hub |
| `/insights/*` (prose) | 1 | Post title | Section headings from content | Logical H2 per section |
| `/insights/learn-claude-ai-high-school/` | 1 | "Your AI Head Start Starts Here" | Why care, curriculum, tracks, etc. | — |
| `/webops/lifecycle/` | 1 | "Web Services Lifecycle" | Phases, intake, delivery, maintenance | — |
| `/webops/bluehost/` | 1 | "Set Up Your Bluehost Hosting" | Account setup, admin access, done | — |

### Heading exceptions summary

| Issue | Page | Severity |
|-------|------|----------|
| Section labels not using H2 | `/managed-ops/` ("How it works", "What's included") | Low — accessibility/outline gap, not multiple-H1 |
| Multiple H1 | None found across 18 indexable pages | ✅ |

---

## Appendix: Metadata source map

| Route | Metadata defined in |
|-------|---------------------|
| `/` | `app/page.tsx` ← `lib/content/homePageContent.ts` |
| `/about/` | `app/about/page.tsx` ← `lib/content/aboutPageContent.ts` |
| `/solutions/` | `app/solutions/page.tsx` ← `lib/content/solutionsHubContent.ts` |
| `/webops/` | `app/webops/page.tsx` (inline) |
| `/revops/` | `app/revops/page.tsx` ← `lib/content/verticalsContent.ts` |
| `/managed-ops/` | `app/managed-ops/page.tsx` ← `lib/content/verticalsContent.ts` |
| `/portfolio/` | `app/portfolio/page.tsx` (inline) |
| `/contact/` | `app/contact/page.tsx` (inline) |
| `/book/` | `app/book/page.tsx` (inline) |
| `/book/webops/` | `app/book/webops/page.tsx` (inline) |
| `/book/revops/` | `app/book/revops/page.tsx` (inline) |
| `/insights/` | `app/insights/page.tsx` ← `lib/content/insightsHubContent.ts` |
| `/insights/[slug]/` | `app/insights/[slug]/page.tsx` ← `lib/insights/posts.ts` + `claudeHighSchoolCurriculum.ts` |
| `/webops/lifecycle/` | `app/webops/lifecycle/page.tsx` ← `lib/content/webServicesLifecycleContent.ts` |
| `/webops/bluehost/` | `app/webops/bluehost/layout.tsx` (inline) |

---

## Priority recommendations (for follow-up work)

1. **Rewrite titles** on service pages to use search language (website management, revenue operations) while keeping "WebOps/RevOps" in body copy or parentheses.
2. **Trim meta descriptions** on `/about/` and all insight posts to ≤160 characters.
3. **Compress hero image** `mhgstrategyhero.png` (724 KB → target <150 KB WebP) — affects LCP on `/`, `/webops/`, `/revops/`.
4. **Compress or replace** six PNGs over 1 MB in `public/uploads/`.
5. **Add cross-links** from service pages to relevant insight posts (see Section 4 proposals).
6. **Promote `/insights/`** from homepage and solutions hub.
7. **Fix `/managed-ops/` heading hierarchy** — promote section labels to H2.

---

*End of audit. No files were modified except this report.*
