# LuxeMarket - Premium E-Commerce Platform

A modern, full-stack e-commerce web application built with React, Vite, Tailwind CSS, Shadcn UI, and Supabase.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Shadcn UI Components
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## Features

### Authentication
- User signup/login/logout with Supabase Auth
- Role-based access control (Customer / Admin)
- Protected routes

### Product Catalog
- Product cards with images, prices, categories, ratings
- Product detail pages with related products
- Search and filtering by category
- Featured products showcase

### Shopping Cart
- Add/remove items
- Quantity management
- Cart persistence with Supabase
- Real-time cart count in navbar

### Checkout
- Multi-step checkout form
- Order summary
- Order placement with automatic stock deduction

### Admin Dashboard
- Add/edit/delete products
- View all orders
- Order status management
- Sales statistics

### Extra Features
- Wishlist functionality
- Product ratings display
- Dark/light mode toggle
- Responsive mobile-first design
- Toast notifications
- Skeleton loaders
- Empty states

## Project Structure

```
ecommerce-app/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── layout/       # Navbar, Footer, etc.
│   │   ├── products/     # Product cards, grids
│   │   ├── cart/         # Cart items, summary
│   │   └── admin/        # Admin components
│   ├── pages/            # Route pages
│   ├── stores/           # Zustand stores
│   ├── lib/              # Utilities, Supabase client
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Router setup
│   └── main.tsx          # Entry point
├── supabase/
│   ├── schema.sql        # Database schema
│   └── seed.sql          # Sample products
├── public/               # Static assets
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ecommerce-app
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your Project URL and Anon Key from Project Settings → API
3. Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Migrations

In your Supabase SQL Editor, run the contents of `supabase/schema.sql` to create all tables, policies, and triggers.

### 4. Seed Sample Data

Run the contents of `supabase/seed.sql` in the SQL Editor to add 30 sample products.

### 5. Set Up Admin User

1. Sign up a new user through the app
2. In Supabase SQL Editor, run:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

### 6. Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel Dashboard → Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

Vercel will auto-detect Vite and use the correct build settings. The included `vercel.json` handles SPA routing.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key (optional) | No |

## Database Schema

### Tables
- **users** - Extended auth user profiles with roles
- **products** - Product catalog with inventory
- **cart_items** - Shopping cart items per user
- **orders** - Order records with status tracking
- **order_items** - Individual items within orders
- **wishlist** - User wishlist items

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Products are publicly readable
- Only admins can modify products
- Order status updates restricted to admins

## Design Philosophy

Inspired by Apple, Nike, and Stripe - the design emphasizes:
- Clean minimalism with generous whitespace
- Premium typography (Inter + Playfair Display)
- Subtle animations and micro-interactions
- Mobile-first responsive design
- Dark mode support

## License

MIT License - feel free to use this for personal or commercial projects.
