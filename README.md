# MHG Strategy Website

A modern Next.js website for MHG Strategy, specializing in Revenue Operations and Process Automation.

## Technology Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Color Palette

- **Primary Blue**: #239bf6
- **Black**: #000000
- **White**: #FFFFFF
- **Grays**: Various shades for text and backgrounds
- **Yellow Gold**: #FFD700 (accent color for CTAs)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx             # Home page
│   ├── solutions/
│   │   └── page.tsx         # Solutions page
│   ├── contact/
│   │   └── page.tsx         # Contact page
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.tsx       # Header navigation
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx              # Hero section
│   ├── Section.tsx           # Reusable section wrapper
│   └── CTAButton.tsx         # Call-to-action button
└── ...
```

## Features

- Fully responsive design (mobile-first)
- SEO-optimized structure
- Fast page loads with Next.js optimization
- Accessible UI components
- Modern, professional design

## Pages

- **Home** (`/`) - Main landing page with all company information
- **Solutions** (`/solutions`) - Solutions overview page
- **Contact** (`/contact`) - Contact form and information

## Development

The project uses:
- TypeScript for type safety
- Tailwind CSS for styling
- Next.js App Router for routing
- React Server Components by default

## Documentation

**Operating SOPs** — the canonical blueprint for all digital build decisions (MHGSYNC, mhgstrategy.com, forms, automations, billing): **[`docs/sops/00_SOP_INDEX.md`](docs/sops/00_SOP_INDEX.md)**.

Full documentation index: [`docs/README.md`](docs/README.md).

| Document | Description |
|----------|-------------|
| [Operating SOP Index](docs/sops/00_SOP_INDEX.md) | Nine-function operating system — **source of truth** for routes, roles, automations, and billing |
| [SDR SOP](docs/sops/03_SOP_SDR.md) | Top of funnel — lead capture, intake routing, offers, booking |
| [Solutions Consultant SOP](docs/sops/04_SOP_SOLUTIONS_CONSULTANT.md) | Close — discovery, scope, agreement, invoice trigger (A1–A5) |
| [Finance SOP](docs/sops/08_SOP_FINANCE.md) | Invoicing, deposits, rate card (§5.2) |
| [Web Services Lifecycle](docs/processes/WEB_SERVICES_LIFECYCLE.md) | Client-facing delivery phases — also at [/webops/lifecycle](https://mhgstrategy.com/webops/lifecycle/) |
| [Apps Script Leads Endpoint](APPS_SCRIPT_LEADS_ENDPOINT.md) | Leads sheet, deploy, email notifications |
| [Form System](lib/forms/README.md) | Contact, offers, and claim forms |

## License

Private - MHG Strategy
