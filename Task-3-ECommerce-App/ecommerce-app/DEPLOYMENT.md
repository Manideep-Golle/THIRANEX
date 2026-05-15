# LUXEMARKET - DEPLOYMENT GUIDE

## Quick Start (5 Minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com and sign up/login
2. Click "New Project" → Give it a name (e.g., "luxemarket")
3. Choose a region close to your users
4. Save the password (you'll need it for SQL Editor)
5. Wait for the project to be ready (~2 minutes)

### Step 2: Get Your API Keys
1. In your Supabase dashboard, go to Project Settings (gear icon)
2. Click "API" in the sidebar
3. Copy:
   - **Project URL** (e.g., `https://abcdefgh12345678.supabase.co`)
   - **anon/public** key (starts with `eyJ...`)

### Step 3: Set Up Database
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Open `supabase/schema.sql` from this project
4. Copy ALL contents and paste into the SQL Editor
5. Click "Run" - this creates all tables, policies, and triggers
6. Create a new query, open `supabase/seed.sql`
7. Copy ALL contents and paste
8. Click "Run" - this adds 30 sample products

### Step 4: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 5: Run Locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

---

## Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/luxemarket.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework Preset: Select "Vite"
   - Click "Deploy"

3. **Add Environment Variables**
   - After deployment, go to Project Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click "Save" and redeploy

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Redeploy with new env vars
vercel --prod
```

---

## Set Up Admin Account

1. Visit your deployed app
2. Sign up with your email
3. Go back to Supabase SQL Editor
4. Run:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
5. Log out and log back in
6. You'll now see "Admin Dashboard" in the user dropdown

---

## Supabase Configuration Details

### Authentication Settings
1. In Supabase dashboard, go to Authentication → Settings
2. Under "Site URL", add your Vercel domain:
   - `https://your-app.vercel.app`
3. Under "Redirect URLs", add:
   - `https://your-app.vercel.app/**`
   - `http://localhost:5173/**` (for local dev)

### Email Templates (Optional)
1. Go to Authentication → Email Templates
2. Customize confirmation emails if desired
3. For production, configure a custom SMTP provider

### Storage (Optional - for product images)
1. Go to Storage → New Bucket
2. Name it "products"
3. Set to "Public bucket"
4. Upload product images and update URLs in the database

---

## Troubleshooting

### "Failed to fetch" errors
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Ensure RLS policies are properly set (run schema.sql again)

### "Access denied" on admin page
- Make sure you've run the admin SQL update
- Check that the `role` column in `users` table is set to 'admin'

### Images not loading
- The seed data uses Unsplash images which should work
- For your own images, use HTTPS URLs or Supabase Storage

### Build errors on Vercel
- Make sure `vercel.json` is in the root
- Check that `vite.config.ts` has the correct alias configuration
- Ensure all dependencies are in `package.json`

---

## Production Checklist

- [ ] Supabase project created and schema applied
- [ ] Seed data loaded
- [ ] Environment variables set in Vercel
- [ ] Site URL configured in Supabase Auth
- [ ] Admin account created and role set
- [ ] RLS policies verified
- [ ] Custom domain configured (optional)
- [ ] Stripe integration added (optional)
- [ ] Analytics added (optional)

---

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   User Browser  │────▶│  Vercel (React) │────▶│  Supabase       │
│                 │     │  - Static files │     │  - PostgreSQL   │
│                 │◄────│  - Client-side  │◄────│  - Auth         │
│                 │     │    routing      │     │  - RLS Policies │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

All data operations go through Supabase client library directly from the browser, secured by Row Level Security policies.
