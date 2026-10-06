import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { connectDB } from './config/db';
import { errorHandler, notFound } from './middleware/errorHandler';
import Admin from './models/Admin';
import Settings from './models/Settings';

// Routes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import uploadRoutes from './routes/uploadRoutes';
import settingsRoutes from './routes/settingsRoutes';
import instagramRoutes from './routes/instagramRoutes';

const app = express();

// Connect to MongoDB and auto-seed admin
const initializeApp = async () => {
  try {
    await connectDB();
    
    // Auto-seed admin if not exists
    const existingAdmin = await Admin.findOne({ email: config.ADMIN_EMAIL });
    if (!existingAdmin) {
      const admin = await Admin.create({
        name: 'Admin',
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
        isFirstLogin: true,
      });
      console.log('✅ Admin user created:', admin.email);
      
      // Create default settings
      await Settings.create({
        heroTitle: "Minal's Art Corner",
        heroSubtitle: "Handcrafted with Love, Delivered with Heart ❤️",
        heroImage: '',
        aboutText: "At Minal's Art Corner, every piece is born from a deep reverence for traditional Indian craftsmanship blended with modern artistic aesthetics. From bridal mehandi and festive torans to bespoke rukhwat setups and customized keepsake gifts, we bring timeless handmade elegance to your special moments.",
        businessHours: 'Mon-Sat, 10 AM - 8 PM IST',
        faqs: [
          { question: 'How to place an order?', answer: 'You can place an order by contacting us via WhatsApp, phone call, or Instagram DM. Browse our gallery, select the product you like, and share the details with us.' },
          { question: 'Do you do custom orders?', answer: 'Yes! We specialize in custom orders. Whether it\'s a personalized gift, custom mehandi design, or bespoke decorative items, we love bringing your vision to life. Contact us with your requirements.' },
          { question: 'What are the delivery charges?', answer: 'Delivery charges vary based on location and order size. We offer free delivery on orders above ₹5000 within India. Contact us for exact delivery charges for your location.' },
          { question: 'How long does delivery take?', answer: 'Standard delivery takes 5-7 business days within India. Custom orders may take 10-15 days depending on complexity. We\'ll provide an estimated timeline when you place the order.' },
          { question: 'Do you deliver outside India?', answer: 'Yes, we ship internationally! International shipping charges and delivery times vary by country. Please contact us with your location for a quote.' },
          { question: 'What payment methods do you accept?', answer: 'We accept UPI, bank transfer, and cash on delivery (within India). For international orders, we accept PayPal and bank transfer. Payment details will be shared after order confirmation.' },
        ],
        metaTitle: "Minal's Art Corner - Handcrafted with Love",
        metaDescription: "Premium handmade decoratives, mehandi, embroidery & gifts by Minal Privin Gurav. Custom orders available. Pan-India delivery.",
      });
      console.log('✅ Default settings created');
    } else {
      console.log('✅ Admin user already exists:', existingAdmin.email);
    }
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
};

initializeApp();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/instagram-posts', instagramRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${config.NODE_ENV} mode on port ${PORT}`);
});

export default app;