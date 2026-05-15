# Deployment Guide

## 🚀 Deploying TaskFlow

---

## Frontend Deployment (Vercel)

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "TaskFlow deployment setup"
git push origin main
```

---

### Step 2: Deploy to Vercel

1. Go to Vercel
2. Import GitHub Repository
3. Select `taskflow` project
4. Configure:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

---

### Step 3: Add Environment Variables

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

### Step 4: Deploy

Click Deploy.

---

## Supabase Setup

### Create Project

1. Create project in Supabase
2. Open SQL Editor
3. Run migration SQL

---

## Enable Realtime

Enable realtime for:
- tasks
- profiles
- categories

---

## Security Setup

Enable:
- Row Level Security (RLS)
- Auth policies
- User-only access

---

## 🌐 Production Checklist

- ✅ Environment Variables Added
- ✅ Realtime Enabled
- ✅ RLS Enabled
- ✅ Responsive UI Tested
- ✅ Build Successful
- ✅ GitHub Repository Updated

---

## 📞 Support

- Vercel Docs
- Supabase Docs
- React Docs