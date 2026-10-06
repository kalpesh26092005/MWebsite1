import mongoose from 'mongoose';
import Admin from '../models/Admin';
import Settings from '../models/Settings';
import { config } from '../config/env';
import { connectDB } from '../config/db';

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: config.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      name: 'Admin',
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASSWORD,
      isFirstLogin: true,
    });

    console.log('Admin created:', admin.email);

    // Create default settings
    await Settings.create({
      heroTitle: "Minal's Art Corner",
      heroSubtitle: "Handcrafted with Love, Delivered with Heart ❤️",
      heroImage: '',
      aboutText: '',
      businessHours: 'Mon-Sat, 10 AM - 8 PM IST',
      faqs: [
        {
          question: 'How to place an order?',
          answer: 'You can place an order by contacting us via WhatsApp, phone call, or Instagram DM. Browse our gallery, select the product you like, and share the details with us.',
        },
        {
          question: 'Do you do custom orders?',
          answer: 'Yes! We specialize in custom orders. Whether it\'s a personalized gift, custom mehandi design, or bespoke decorative items, we love bringing your vision to life. Contact us with your requirements.',
        },
        {
          question: 'What are the delivery charges?',
          answer: 'Delivery charges vary based on location and order size. We offer free delivery on orders above ₹5000 within India. Contact us for exact delivery charges for your location.',
        },
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 5-7 business days within India. Custom orders may take 10-15 days depending on complexity. We\'ll provide an estimated timeline when you place the order.',
        },
        {
          question: 'Do you deliver outside India?',
          answer: 'Yes, we ship internationally! International shipping charges and delivery times vary by country. Please contact us with your location for a quote.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept UPI, bank transfer, and cash on delivery (within India). For international orders, we accept PayPal and bank transfer. Payment details will be shared after order confirmation.',
        },
      ],
      metaTitle: "Minal's Art Corner - Handcrafted with Love",
      metaDescription: "Premium handmade decoratives, mehandi, embroidery & gifts by Minal Privin Gurav. Custom orders available. Pan-India delivery.",
    });

    console.log('Default settings created');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();