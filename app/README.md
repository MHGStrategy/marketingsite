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

## License

Private - MHG Strategy
