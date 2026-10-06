# 🚀 Deployment Guide - Minal's Art Corner

## Step 1: Set Up MongoDB Atlas (Cloud Database - Accessible from Anywhere)

### Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** for a free account
3. **Create a new cluster**:
   - Choose **FREE M0** tier (512MB storage)
   - Select a cloud provider (AWS recommended)
   - Choose a region close to you
   - Click **Create Cluster**

4. **Create Database User**:
   - Go to **Database Access** in left sidebar
   - Click **Add New Database User**
   - Choose **Password** authentication
   - Username: `minaladmin`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: **Read and write to any database**
   - Click **Add User**

5. **Whitelist IP Addresses**:
   - Go to **Network Access** in left sidebar
   - Click **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0)
   - Click **Confirm**
   - ⚠️ This allows access from any system/network

6. **Get Connection String**:
   - Go to **Database** in left sidebar
   - Click **Connect** on your cluster
   - Choose **Connect your application**
   - Copy the connection string (looks like):
   ```
   mongodb+srv://minaladmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Replace `/?retryWrites` with `/minals-art-corner?retryWrites`

## Step 2: Deploy Backend to Render/Railway (Vercel doesn't support long-running servers)

### Option A: Deploy Backend on Render.com (Recommended - Free Tier)

1. **Go to Render**: https://render.com/
2. **Sign up** with GitHub
3. **Click "New +"** → **Web Service**
4. **Connect your GitHub repository**
5. **Configure the service**:
   - **Name**: `minals-art-corner-api`
   - **Region**: Choose closest to you
   - **Branch**: `main` or `master`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

6. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://minaladmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/minals-art-corner?retryWrites=true&w=majority
   JWT_SECRET=your-super-secure-random-string-change-this-to-something-very-long-and-random
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ADMIN_EMAIL=admin@minalsartcorner.com
   ADMIN_PASSWORD=Admin@123
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

7. **Click "Create Web Service"**
8. Wait for deployment (takes 2-3 minutes)
9. **Copy your backend URL**: `https://minals-art-corner-api.onrender.com`

### Option B: Deploy Backend on Railway.app

1. **Go to Railway**: https://railway.app/
2. **Sign up** with GitHub
3. **Click "New Project"** → **Deploy from GitHub repo**
4. Select your repository
5. **Add variables** (same as above)
6. Railway will auto-detect and deploy
7. **Get your backend URL** from the deployment

## Step 3: Set Up Cloudinary (Image Storage)

1. **Go to Cloudinary**: https://cloudinary.com/users/register/free
2. **Sign up** for free account (25GB free storage)
3. **Go to Dashboard**: https://cloudinary.com/console
4. **Copy your credentials**:
   - Cloud Name
   - API Key
   - API Secret
5. Add these to your backend environment variables

## Step 4: Deploy Frontend to Vercel

1. **Update Client Environment Variables**:

Create `client/.env.production`:
```env
VITE_API_URL=https://minals-art-corner-api.onrender.com/api
VITE_WHATSAPP_NUMBER=919307791258
```

2. **Go to Vercel**: https://vercel.com/
3. **Sign up** with GitHub
4. **Click "Add New"** → **Project**
5. **Import your GitHub repository**
6. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

7. **Add Environment Variables**:
   - Click **Environment Variables**
   - Add:
     ```
     VITE_API_URL=https://minals-art-corner-api.onrender.com/api
     VITE_WHATSAPP_NUMBER=919307791258
     ```

8. **Click "Deploy"**
9. Wait for deployment (takes 1-2 minutes)
10. **Your site is live!** Get the URL: `https://minals-art-corner.vercel.app`

## Step 5: Update Backend with Frontend URL

1. Go back to Render/Railway
2. Update the `CLIENT_URL` environment variable with your Vercel URL:
   ```
   CLIENT_URL=https://minals-art-corner.vercel.app
   ```
3. Save and redeploy

## Step 6: Seed the Database (One-time setup)

### Option 1: Run locally and seed to cloud database

1. Update your local `.env` with the MongoDB Atlas connection string
2. Run:
   ```bash
   cd server
   npm run seed
   ```

### Option 2: Use MongoDB Atlas interface

1. Go to MongoDB Atlas → **Database** → **Browse Collections**
2. Create collections manually and add the admin document
3. Or use MongoDB Compass to connect and seed

## Step 7: Test Your Deployment

1. **Visit your frontend**: `https://minals-art-corner.vercel.app`
2. **Test the site**: Browse products, categories, etc.
3. **Login to admin**: Go to `/admin_access`
   - Email: `admin@minalsartcorner.com`
   - Password: `Admin@123`

## 🔒 Security Checklist

- [ ] Change default admin password after first login
- [ ] Use strong JWT_SECRET (random 64+ character string)
- [ ] MongoDB Atlas: Verify network access is configured
- [ ] Cloudinary: Check upload presets if using unsigned uploads
- [ ] Environment variables: Double-check all values

## 🌍 Accessing Database from Any System

Your MongoDB Atlas database is now cloud-based and accessible from:
- ✅ Your local development machine
- ✅ Your production server (Render/Railway)
- ✅ Any other computer (just use the connection string)
- ✅ Mobile apps (if you build them later)

**To access from a new system:**
1. Clone your repository
2. Update `.env` with the MongoDB Atlas connection string
3. Run `npm run install:all`
4. Run `npm run dev`

## 📱 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to your project settings
2. Click **Domains**
3. Add your custom domain (e.g., `minalsartcorner.com`)
4. Follow DNS configuration instructions

### For Render (Backend):
1. Go to your service settings
2. Click **Custom Domains**
3. Add your API domain (e.g., `api.minalsartcorner.com`)

## 🚨 Common Issues & Fixes

### Issue: "Cannot connect to database"
- **Fix**: Check MongoDB Atlas connection string
- Verify password doesn't contain special characters (URL encode if needed)
- Check network access allows 0.0.0.0/0

### Issue: "CORS error"
- **Fix**: Update `CLIENT_URL` in backend environment variables
- Make sure it matches your exact Vercel URL

### Issue: "Images not uploading"
- **Fix**: Verify Cloudinary credentials are correct
- Check Cloudinary dashboard for upload limits

### Issue: "Backend sleeping on Render free tier"
- **Solution**: Render free tier sleeps after 15 min of inactivity
- Use a service like UptimeRobot to ping it every 10 minutes
- Or upgrade to paid tier ($7/month)

## 📊 Monitoring

- **Vercel Analytics**: Built-in, free
- **Render Logs**: Check logs in Render dashboard
- **MongoDB Atlas Monitoring**: Check database metrics

## 💰 Cost Breakdown

- MongoDB Atlas: **FREE** (512MB M0 cluster)
- Cloudinary: **FREE** (25GB storage, 25GB bandwidth/month)
- Render.com: **FREE** (750 hours/month, sleeps after inactivity)
- Vercel: **FREE** (100GB bandwidth, unlimited sites)

**Total Cost: $0/month** 🎉

Upgrade only when you need:
- More database storage
- 24/7 backend uptime
- More bandwidth

## 🎉 You're Done!

Your full-stack e-commerce site is now:
- ✅ Deployed and live
- ✅ Database accessible from anywhere
- ✅ Scalable and production-ready
- ✅ Using free tier services

---

**Need Help?**
- Backend issues: Check Render logs
- Frontend issues: Check Vercel deployment logs
- Database issues: Check MongoDB Atlas monitoring

**Happy Deploying! 🚀**