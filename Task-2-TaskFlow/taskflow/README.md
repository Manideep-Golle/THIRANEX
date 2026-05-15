# TaskFlow

A modern, full-stack task management application built with React, Vite, Tailwind CSS, and Supabase.

![TaskFlow](https://img.shields.io/badge/React-18-blue)
![TaskFlow](https://img.shields.io/badge/Vite-5-purple)
![TaskFlow](https://img.shields.io/badge/Supabase-2-green)

## Features

- **Authentication**: Sign up, login, logout with Supabase Auth
- **Task Management**: Create, edit, delete, and complete tasks
- **Priority Levels**: Low, Medium, High with color coding
- **Categories**: Organize tasks with custom categories and colors
- **Due Dates**: Track deadlines with visual indicators
- **Dashboard**: Statistics cards, today's tasks, progress overview
- **Search & Filter**: Find tasks by status, priority, category, or search term
- **Dark/Light Mode**: Fully responsive theme system
- **Mobile Friendly**: Responsive design with mobile navigation
- **Real-time**: Live updates via Supabase subscriptions
- **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Auth + Database + Realtime)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner (toast)
- **Deployment**: Vercel

## Project Structure

```
taskflow/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (Button, Card, Input, etc.)
│   │   ├── layout/       # Layout components (Sidebar, Header, MobileNav)
│   │   ├── tasks/        # Task-specific components (TaskCard, TaskForm, etc.)
│   │   └── dashboard/    # Dashboard widgets (StatsCards, Progress, etc.)
│   ├── pages/            # Route pages (Dashboard, Tasks, Login, etc.)
│   ├── hooks/            # Custom React hooks (useTasks, useMediaQuery)
│   ├── context/          # React context providers (Auth, Theme)
│   ├── lib/              # Utilities (cn, formatDate, supabase client)
│   ├── types/            # TypeScript type definitions
│   └── main.tsx          # App entry point
├── supabase/
│   └── migrations/       # Database schema migrations
└── public/               # Static assets
```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account (free tier works)

### 2. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd taskflow

# Install dependencies
npm install
```

### 3. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to Project Settings → API
3. Copy your `Project URL` and `anon/public` API key
4. Go to the SQL Editor in your Supabase dashboard
5. Run the migration file: `supabase/migrations/001_initial_schema.sql`
6. This creates:
   - `profiles` table (user profiles)
   - `tasks` table (task data)
   - `categories` table (task categories)
   - Row Level Security (RLS) policies
   - Indexes for performance
   - Realtime subscriptions

### 4. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: 
- Variables must be prefixed with `VITE_` to be accessible in the browser
- Never commit your `.env` file to version control
- The `anon` key is safe for the browser (it respects RLS policies)

### 5. Start Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Redeploy if needed

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration
5. Add environment variables in project settings
6. Deploy!

### Important: SPA Configuration

The included `vercel.json` handles client-side routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This ensures React Router works correctly with page refreshes and direct links.

## Supabase RLS Policies

The application uses Row Level Security to ensure users can only access their own data:

- **profiles**: Users can only read/update their own profile
- **tasks**: Users can only CRUD their own tasks
- **categories**: Users can only CRUD their own categories

All policies use `auth.uid() = user_id` checks and are set to `TO authenticated`.

## Customization

### Adding New Categories

Categories are created per-user in the app. Default colors:
- Work: `#6366f1` (Indigo)
- Personal: `#ec4899` (Pink)
- Urgent: `#ef4444` (Red)
- Learning: `#10b981` (Emerald)

### Theme Customization

Edit `tailwind.config.ts` to customize:
- Colors
- Border radius
- Animations
- Breakpoints

### Database Schema Changes

When modifying the schema:
1. Update `src/types/supabase.ts` with new types
2. Update `src/types/index.ts` for app types
3. Create a new migration in `supabase/migrations/`

## Performance Tips

1. **Indexes**: The migration creates indexes on frequently queried columns
2. **RLS Optimization**: Use `(select auth.uid())` instead of `auth.uid()` in policies
3. **Explicit Filters**: Add `.eq('user_id', userId)` in queries to help PostgreSQL optimizer
4. **Pagination**: For large task lists, implement cursor-based pagination

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env` file exists with correct variable names
- Variables must start with `VITE_`
- Restart dev server after adding env variables

### "Failed to fetch" errors
- Check if Supabase project is active (not paused)
- Verify RLS policies are correctly set
- Check browser console for CORS errors

### "Table does not exist"
- Run the migration SQL in Supabase SQL Editor
- Ensure you're in the correct project

### Build fails on Vercel
- Ensure `vercel.json` is included for SPA routing
- Check that `dist` folder is created during build
- Verify Node.js version in Vercel settings (18+)

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ using React, Vite, and Supabase.
