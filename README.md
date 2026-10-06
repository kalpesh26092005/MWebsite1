# Minal's Art Corner - Full-Stack E-Commerce Showcase Website

![Minal's Art Corner](https://img.shields.io/badge/Status-Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A stunning, luxurious, and professionally designed full-stack website for **Minal's Art Corner** — a handmade art & craft business. The website serves as a product showcase, portfolio, and direct ordering platform.

## 🎯 Project Overview

This is a comprehensive e-commerce showcase platform where customers can browse handcrafted products and place orders directly via WhatsApp, Phone, or Instagram DM. **No traditional shopping cart or payment gateway** — all orders are handled through direct communication.

### ✨ Key Features

- 🎨 **Luxurious Design** - Gold-themed UI with glassmorphism effects
- 🌓 **Dark/Light Mode** - Seamless theme switching
- 📱 **Fully Responsive** - Perfect on all devices (mobile-first)
- ⚡ **PWA Ready** - Progressive Web App capabilities
- 🔒 **Secure Admin Panel** - JWT-based authentication
- 🖼️ **Image Management** - Cloudinary integration
- 🎭 **Smooth Animations** - Framer Motion throughout
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap
- 📞 **WhatsApp Integration** - Direct ordering via WhatsApp
- 🎯 **Product Categories** - Mehandi, Embroidery, Rukhwat, Toran, Gifts, Platters, etc.

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM v6** - Routing
- **React Context API** - State management
- **Axios** - API calls
- **React Hot Toast** - Notifications
- **React Helmet Async** - SEO
- **Lucide React** - Icons

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File uploads
- **Bcrypt** - Password hashing
- **Express Validator** - Request validation

## 📁 Project Structure

```
minals-art-corner/
├── client/                    # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/       # Navbar, Footer, etc.
│   │   │   ├── home/         # Home page components
│   │   │   ├── gallery/      # Gallery components
│   │   │   ├── product/      # Product detail components
│   │   │   └── admin/        # Admin components
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── NotFound.tsx
│   │   │   └── admin/        # Admin pages
│   │   ├── context/          # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Helper functions
│   │   └── styles/           # Global styles
│   └── package.json
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── config/           # Database, Cloudinary config
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth, validation, upload
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Helper functions
│   │   └── app.ts            # Express app
│   └── package.json
│
├── .env                       # Environment variables
├── .gitignore
├── package.json               # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minals-art-corner
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   
   Update the `.env` file in the root directory:
   ```env
   # Server
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/minals-art-corner
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=7d

   # Cloudinary
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

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed the database** (creates default admin and settings)
   ```bash
   cd server
   npm run seed
   cd ..
   ```

6. **Run the development servers**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📱 Default Admin Credentials

```
Email: admin@minalsartcorner.com
Password: Admin@123
```

**⚠️ Important:** Change the default password after first login!

## 🎨 Design Features

### Color Palette
- **Primary Gold:** `#B8860B` (Dark Goldenrod)
- **Secondary Gold:** `#D4AF37` (Metallic Gold)
- **Accent:** `#C41E3A` (Deep Rose/Crimson)
- **Background:** `#FFF8F0` (Warm Cream)
- **Dark Background:** `#1A1A2E` (Deep Navy)

### Typography
- **Headings:** Playfair Display (Elegant serif)
- **Body:** Poppins (Clean sans-serif)
- **Accent:** Great Vibes (Script for special text)

### Key Design Elements
- Glassmorphism cards
- Gold shimmer animations
- Parallax scrolling
- Floating decorative elements
- Smooth page transitions
- Micro-interactions

## 📋 Features Breakdown

### Public Features
- ✅ Beautiful hero section with CTA
- ✅ About preview with stats
- ✅ Featured categories grid
- ✅ Best sellers showcase
- ✅ How to order process
- ✅ Customer testimonials carousel
- ✅ Instagram feed integration
- ✅ Product gallery with filters
- ✅ Product detail pages
- ✅ WhatsApp floating button
- ✅ Dark/Light mode toggle
- ✅ Responsive navigation
- ✅ SEO optimization
- ✅ 404 error page

### Admin Features
- ✅ Secure JWT authentication
- ✅ Dashboard overview
- 🔄 Product CRUD operations (placeholder)
- 🔄 Category CRUD operations (placeholder)
- 🔄 Testimonial CRUD operations (placeholder)
- 🔄 Instagram post management (placeholder)
- 🔄 Site settings management (placeholder)

**Note:** Admin CRUD pages are placeholders. Full implementation with forms, tables, and image uploads needs to be completed.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current admin
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (Admin)
- `PUT /api/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

### Instagram Posts
- `GET /api/instagram-posts` - Get all posts
- `POST /api/instagram-posts` - Create post (Admin)
- `DELETE /api/instagram-posts/:id` - Delete post (Admin)

### Upload
- `POST /api/upload` - Upload image (Admin)
- `DELETE /api/upload/:publicId` - Delete image (Admin)

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update settings (Admin)

## 🎯 Business Information

- **Name:** Minal Privin Gurav
- **Brand:** Minal's Art Corner
- **Phone:** +91 9307791258
- **WhatsApp:** +91 9307791258
- **Instagram:** [@minals_art_corner_](https://www.instagram.com/minals_art_corner_)
- **Tagline:** "Handcrafted with Love, Delivered with Heart ❤️"

## 📦 Product Categories

1. **Mehandi** - Bridal, Festival, Arabic, Indo-Western designs
2. **Embroidery** - Hand-embroidered pieces, frames
3. **Rukhwat** - Traditional Maharashtrian wedding items
4. **Toran** - Door hangings, festive torans
5. **Handmade Gifts** - Personalized gifts, explosion boxes
6. **Decorative Platters** - Wedding platters, saree packing
7. **Festival Specials** - Diwali, Navratri, Ganpati items
8. **Custom Orders** - Fully customized handmade items

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `client/dist` folder
3. Set environment variables in hosting dashboard

### Backend (Render/Railway/DigitalOcean)
1. Build the server: `cd server && npm run build`
2. Deploy with start command: `npm start`
3. Set environment variables

### Database (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas
2. Update `MONGODB_URI` in environment variables
3. Whitelist server IP address

### Images (Cloudinary)
1. Create a Cloudinary account (Free tier: 25GB)
2. Get API credentials from dashboard
3. Update Cloudinary environment variables

## 📝 To-Do / Future Enhancements

- [ ] Complete Admin CRUD functionality with forms
- [ ] Add image upload preview and cropping
- [ ] Implement product search with autocomplete
- [ ] Add product wishlist (localStorage)
- [ ] Implement recently viewed products
- [ ] Add analytics dashboard for admin
- [ ] Create sitemap.xml generator
- [ ] Add email notifications (optional)
- [ ] Implement product reviews system
- [ ] Add bulk product import/export
- [ ] Create mobile app (React Native)
- [ ] Add multi-language support

## 🐛 Known Issues

- Admin CRUD pages are placeholders and need full implementation
- Image upload UI needs to be completed
- Product filtering could be more advanced
- No email notifications system yet

## 🤝 Contributing

This is a custom project for Minal's Art Corner. If you'd like to contribute or report issues, please contact the developer.

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 💬 Support

For support or questions:
- **Email:** admin@minalsartcorner.com
- **WhatsApp:** +91 9307791258
- **Instagram:** [@minals_art_corner_](https://www.instagram.com/minals_art_corner_)

## 🙏 Acknowledgments

- Design inspiration from luxury e-commerce sites
- Icons by Lucide React
- Fonts by Google Fonts
- Images hosted on Cloudinary

---

**Made with ❤️ for Minal's Art Corner**

*Handcrafted with Love, Delivered with Heart*