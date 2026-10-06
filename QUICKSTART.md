# ⚡ Quick Start Guide

## ✅ Installation Complete!

All dependencies are now installed. Here's how to get started:

## 🚀 Running Locally (Development)

### 1. Set Up MongoDB Atlas (Cloud Database)

**Why MongoDB Atlas?**
- ✅ Access your database from ANY computer
- ✅ No need to install MongoDB locally
- ✅ FREE tier (512MB)
- ✅ Automatic backups

**Setup Steps:**
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a FREE account
3. Create a cluster (M0 FREE tier)
4. Create database user
5. Allow access from anywhere (Network Access → 0.0.0.0/0)
6. Get connection string

### 2. Set Up Cloudinary (Image Storage)

1. Go to: https://cloudinary.com/users/register/free
2. Sign up for FREE account
3. Get your credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret

### 3. Update Environment Variables

Edit `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/minals-art-corner?retryWrites=true&w=majority
JWT_SECRET=change-this-to-a-very-long-random-string-for-security
JWT_EXPIRE=7d

# Cloudinary (GET FROM CLOUDINARY DASHBOARD)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin (Initial Setup)
ADMIN_EMAIL=admin@minalsartcorner.com
ADMIN_PASSWORD=Admin@123

# Client
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=919307791258
```

### 4. Seed the Database (Create Admin User)

```bash
cd server
npm run seed
cd ..
```

### 5. Start Development Servers

```bash
npm run dev
```

This will start:
- 🎨 Frontend: http://localhost:3000
- ⚙️ Backend: http://localhost:5000

### 6. Login to Admin Panel

Go to: http://localhost:3000/admin_access

**Default Credentials:**
- Email: `admin@minalsartcorner.com`
- Password: `Admin@123`

⚠️ **Change password after first login!**

---

## 🌐 Deploying to Production

For detailed deployment instructions, see **DEPLOYMENT.md**

### Quick Deployment Summary:

1. **Database**: MongoDB Atlas (FREE) - Already set up above!
2. **Images**: Cloudinary (FREE) - Already set up above!
3. **Backend**: Deploy to Render.com (FREE)
4. **Frontend**: Deploy to Vercel (FREE)

**Total Cost: $0/month** 🎉

See DEPLOYMENT.md for step-by-step guide.

---

## 📁 Project Structure

```
minals-art-corner/
├── client/          # React frontend (Vite + TypeScript + Tailwind)
├── server/          # Express backend (TypeScript + MongoDB)
├── .env            # Environment variables
└── README.md       # Full documentation
```

---

## 🎯 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Set up Cloudinary
3. ✅ Update `.env` file
4. ✅ Run `cd server && npm run seed`
5. ✅ Run `npm run dev`
6. ✅ Visit http://localhost:3000
7. ✅ Login to admin panel
8. ✅ Add products, categories, etc.
9. ✅ Deploy to production (see DEPLOYMENT.md)

---

## 🆘 Need Help?

### Common Issues:

**"Cannot connect to database"**
- Make sure MongoDB Atlas connection string is correct in `.env`
- Check MongoDB Atlas Network Access allows 0.0.0.0/0

**"Dependencies installation failed"**
- Already fixed! ✅
- If issues persist, delete `node_modules` folders and run `npm run install:all` again

**"Port already in use"**
- Change PORT in `.env` to 5001 or another available port

**"Cloudinary upload failed"**
- Verify Cloudinary credentials in `.env`
- Check Cloudinary dashboard for API limits

---

## 📞 Contact

**Minal's Art Corner**
- Phone: +91 9307791258
- WhatsApp: +91 9307791258
- Instagram: @minals_art_corner_

---

**Ready to start? Run:**

```bash
npm run dev
```

**Happy coding! 🎨✨**