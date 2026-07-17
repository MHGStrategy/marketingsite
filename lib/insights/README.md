# Insights / Blog Posts

How to publish a new article on `/insights/`.

## Architecture

Insights are **code-first** — not markdown files or a CMS at runtime.

| Layer | Path | Purpose |
|-------|------|---------|
| Registry | `lib/insights/posts.ts` | Listing metadata (title, excerpt, date, category, audience) |
| Prose content | `lib/insights/content/*.ts` | Structured article body for standard long-form posts |
| Prose registry | `lib/insights/prosePosts.ts` | Maps slug → prose content |
| Prose renderer | `components/insights/InsightProsePost.tsx` | Shared layout for prose articles |
| Bespoke posts | `components/insights/*Post.tsx` | Custom layouts (e.g. curriculum guides with in-page nav) |
| Hub page | `app/insights/page.tsx` | Lists all posts from the registry |
| Post page | `app/insights/[slug]/page.tsx` | Renders prose or bespoke content per slug |
| Sitemap | `app/sitemap.ts` | Auto-includes all slugs from `insightPosts` |

**Two post types:**

1. **Prose insight** (~750 words, H2 sections, bullet lists) — use the shared pattern below.
2. **Bespoke insight** (interactive curriculum, custom nav, JSON-LD) — follow the `learn-claude-ai-high-school` pattern in `ClaudeHighSchoolPost.tsx`.

---

## Quick checklist: add a prose insight

Estimated time after setup: ~10 minutes per post.

### 1. Create content file

Add `lib/insights/content/yourSlug.ts`:

```typescript
import type { InsightArticleContent } from '@/lib/insights/types';

export const yourSlugContent: InsightArticleContent = {
  slug: 'your-post-slug',
  lede: 'Opening paragraph(s) shown under the title in the hero.',
  sections: [
    {
      heading: 'Section heading (maps to ## in markdown)',
      paragraphs: [
        'Intro paragraph before bullets (optional).',
        'Closing paragraph after bullets (optional).',
      ],
      bullets: ['Bullet item one', 'Bullet item two'], // optional
    },
  ],
  cta: {
    body: 'Closing pitch before the button.',
    label: 'Explore RevOps', // or Explore WebOps
    href: '/revops',         // or /webops
  },
};
```

**Markdown → content mapping:**

| Markdown | TypeScript field |
|----------|------------------|
| `# Title` | `posts.ts` → `title` |
| First paragraph(s) before first `##` | `lede` |
| `## Heading` | `sections[].heading` |
| Body paragraphs | `sections[].paragraphs` |
| `- **Label.** text` | `sections[].bullets` (drop markdown bold) |
| Final service pitch | `cta.body` |

### 2. Register in posts.ts

Add an entry to `insightPosts` in `lib/insights/posts.ts`. Keep the array **sorted newest-first** by `publishedAt`.

```typescript
{
  slug: 'your-post-slug',
  title: 'Your Post Title',
  excerpt: 'One paragraph for cards and default SEO.',
  publishedAt: '2026-06-25', // YYYY-MM-DD
  category: 'Operations',
  audience: 'SMB',
},
```

### 3. Wire prose content

Import and add to `prosePosts` in `lib/insights/prosePosts.ts`:

```typescript
import { yourSlugContent } from '@/lib/insights/content/yourSlug';

export const prosePosts: Record<string, InsightArticleContent> = {
  // ...
  'your-post-slug': yourSlugContent,
};
```

No changes needed in `[slug]/page.tsx` — it reads from `prosePosts` automatically.

### 4. Build and verify

```bash
npm run build
```

Confirm:

- Card appears on `/insights/` with correct date
- Full article at `/insights/your-post-slug/`
- CTA links to the correct destination
- Sitemap includes the new URL (automatic)

---

## Field reference

### `InsightPost` (registry)

| Field | Type | Example |
|-------|------|---------|
| `slug` | string | `'define-the-workload'` → `/insights/define-the-workload/` |
| `title` | string | Card title and default page `<title>` |
| `excerpt` | string | Card body and default meta description |
| `publishedAt` | string | `'2026-06-23'` (ISO date) |
| `category` | string | Badge on card (e.g. `'Data Architecture'`) |
| `audience` | string | Badge on card (e.g. `'Mid-Market'`, `'SMB'`) |

### `InsightArticleContent` (prose body)

| Field | Type | Notes |
|-------|------|-------|
| `slug` | string | Must match registry slug |
| `lede` | string | Hero subhead below title |
| `sections` | `InsightSection[]` | Alternating gray/white body sections |
| `cta` | object | `{ body, label, href }` closing block |

### `InsightSection`

| Field | Type | Notes |
|-------|------|-------|
| `heading` | string | H2 |
| `paragraphs` | string[] | With bullets: first = intro, rest = closing after list |
| `bullets` | string[] | Optional bullet list between intro and closing |

---

## CTA rules

Per [Marketing SOP §5.1](../../docs/sops/02_SOP_MARKETING.md):

- **SMB audience** → CTA to `/webops`
- **Mid-market audience** → CTA to `/revops`

Before publishing, run the **conversion-gap check** (Marketing SOP §5.2): open the destination page and confirm its copy echoes the article framing.

---

## Bespoke posts (when prose isn't enough)

Use the Claude high-school guide pattern when you need:

- Sticky in-page navigation (`InsightInPageNav`)
- Multi-phase curriculum or interactive sections
- Custom JSON-LD / SEO metadata

Steps:

1. Add registry entry in `posts.ts`
2. Create content file in `lib/insights/content/` (metadata, sections, JSON-LD)
3. Create component in `components/insights/YourPost.tsx`
4. Add a `case` in `PostContent` inside `app/insights/[slug]/page.tsx`
5. Add custom `generateMetadata` branch if needed

Do **not** add bespoke posts to `prosePosts.ts`.

---

## Current posts

| Slug | Type | Date |
|------|------|------|
| `ai-ready-data` | Prose | 2026-06-25 |
| `define-the-workload` | Prose | 2026-06-23 |
| `excel-to-saas` | Prose | 2026-06-19 |
| `learn-claude-ai-high-school` | Bespoke | 2026-06-07 |
