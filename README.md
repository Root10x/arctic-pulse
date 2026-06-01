# Arctic Pulse Content OS

A centralized editorial workflow platform for managing multiple Nordic and Arctic websites.

## Overview

Arctic Pulse Content OS is a frontend-only interactive prototype designed to demonstrate the complete user experience for content operations across multiple WordPress websites.

## Features

- **Dashboard**: Operational overview with site health, publishing activity, and quick actions
- **New Content**: Central content intake hub with multiple input methods
- **Review Queue**: 3-column editorial approval workflow (list, editor, metadata)
- **Content Library**: Searchable archive with filters and bulk actions
- **Publishing Calendar**: Visual scheduling with month/week/day views
- **Sites**: Portfolio management for connected websites
- **Media Library**: Central image management with detail drawer
- **Analytics**: Performance dashboards with charts and comparisons
- **Settings**: Workspace configuration, users, and preferences

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui patterns
- Recharts (analytics)
- Lucide React (icons)
- Date-fns

## Getting Started

```bash
# Install dependencies
cd web
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Vercel (Recommended)

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set the root directory to `web`
4. Deploy

The project uses static export (`output: 'export'`) and is optimized for Vercel hosting.

### GitHub Pages

The static export in `dist/` can be deployed to any static hosting provider.

## Project Structure

```
web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Dashboard
│   ├── layout.tsx          # Root layout with sidebar
│   ├── review-queue/       # Review Queue (hero screen)
│   ├── content-library/    # Content archive
│   ├── calendar/           # Publishing calendar
│   ├── sites/              # Site management
│   ├── media-library/      # Media assets
│   ├── analytics/          # Performance dashboards
│   ├── new-content/        # Content creation
│   └── settings/           # Configuration
├── components/             # Shared UI components
├── lib/                    # Utilities and mock data
└── public/                 # Static assets
```

## Mock Data

All data is simulated. No backend or API integrations are included in this prototype.

## License

Proprietary - For client demonstration purposes only.
