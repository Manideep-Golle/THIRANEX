# Deployment Guide

## 🚀 Quick Deploy

### Prerequisites
- GitHub account
- Vercel account (free)
- Render account (free)
- MongoDB Atlas account (free tier)

---

## Step 1: MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up / Log in
3. Create a new cluster (M0 - Free tier)
4. Create a database user with username and password
5. Add your IP to Network Access (or use `0.0.0.0/0` for all IPs)
6. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

---

## Step 2: Backend Deployment (Render)

### Option A: Using Render Dashboard

1. Push your backend code to GitHub:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
   git push -u origin main
   ```

2. Go to [render.com](https://render.com) and sign in with GitHub
3. Click **New > Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `portfolio-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `CORS_ORIGIN` = Your frontend URL (e.g., `https://your-portfolio.vercel.app`)

7. Click **Deploy Web Service**

### Option B: Using render.yaml (Blueprint)

1. Include `render.yaml` in your repo
2. Go to Render Dashboard → Blueprints → New Blueprint Instance
3. Connect your repo
4. Fill in the secret values when prompted

---

## Step 3: Frontend Deployment (Vercel)

### Option A: Using Vercel Dashboard

1. Push your frontend code to GitHub:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-frontend.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

7. Add Environment Variables:
   - `VITE_API_URL` = Your Render backend URL + `/api`
     (e.g., `https://portfolio-backend.onrender.com/api`)

8. Click **Deploy**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Follow prompts and set environment variables
```

---

## Step 4: Update CORS (After Frontend Deploy)

1. Once frontend is deployed, copy the Vercel URL
2. Go to Render Dashboard → Your Service → Environment
3. Update `CORS_ORIGIN` to your Vercel URL
4. Render will auto-redeploy

---

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Ensure password doesn't contain special characters that need URL encoding

**CORS Errors:**
- Verify `CORS_ORIGIN` matches your frontend URL exactly
- Include `https://` prefix
- No trailing slash

**Build Fails:**
- Check Node.js version (should be 18+)
- Verify `package.json` has correct `start` script
- Check for syntax errors in code

### Frontend Issues

**API Calls Failing:**
- Verify `VITE_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Build Output Empty:**
- Verify `vite.config.js` has correct `outDir`
- Check `dist` folder exists after build

---

## 📊 Performance Tips

1. **Enable Vercel Analytics** for Core Web Vitals monitoring
2. **Use Render's Auto-Deploy** for continuous deployment
3. **Compress images** before adding to public folder
4. **Enable MongoDB Atlas monitoring** for database insights

---

## 🔄 Continuous Deployment

Both Vercel and Render support auto-deployment:

- **Vercel**: Auto-deploys on every push to main branch
- **Render**: Auto-deploys on every push with build success

Preview deployments are created for Pull Requests automatically.

---

## 🌐 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### Render Custom Domain
1. Go to Service Settings → Custom Domains
2. Add your domain
3. Configure DNS records as instructed

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Render Docs**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
