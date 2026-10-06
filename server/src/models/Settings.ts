import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  businessHours: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

const settingsSchema = new Schema<ISettings>({
  heroTitle: {
    type: String,
    default: "Minal's Art Corner",
  },
  heroSubtitle: {
    type: String,
    default: "Handcrafted with Love, Delivered with Heart ❤️",
  },
  heroImage: {
    type: String,
    default: '',
  },
  aboutText: {
    type: String,
    default: '',
  },
  businessHours: {
    type: String,
    default: 'Mon-Sat, 10 AM - 8 PM IST',
  },
  faqs: [{
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  }],
  metaTitle: {
    type: String,
    default: "Minal's Art Corner - Handcrafted with Love",
  },
  metaDescription: {
    type: String,
    default: "Premium handmade decoratives, mehandi, embroidery & gifts by Minal Privin Gurav. Custom orders available. Pan-India delivery.",
  },
}, {
  timestamps: true,
});

export default mongoose.model<ISettings>('Settings', settingsSchema);