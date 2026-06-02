# Arctic Pulse Content OS

## Deployment Instructions

### Step 1: Extract the ZIP
Extract this ZIP file. You should see these files at the root level:
- package.json
- tsconfig.json
- next.config.js
- tailwind.config.ts
- postcss.config.js
- next-env.d.ts
- app/ (folder)
- components/ (folder)
- lib/ (folder)

### Step 2: Deploy to Vercel
1. Push these files to a GitHub repository
2. Connect the repo to Vercel
3. Vercel will auto-detect Next.js and build

### OR: Deploy via Vercel CLI
```bash
npm install
npm run build
```

### Important: Root Level Files
The Next.js project files MUST be at the root of your repository.
Do NOT put them inside a `web/` or any other subfolder.

## Project Structure
- `app/` - Next.js App Router pages (11 screens)
- `components/` - Reusable React components
- `lib/` - Mock data and utilities
