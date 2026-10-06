import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  review: string;
  rating: number;
  image?: {
    url: string;
    publicId: string;
  };
  isVisible: boolean;
  displayOrder: number;
}

const testimonialSchema = new Schema<ITestimonial>({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [100, 'Customer name cannot exceed 100 characters'],
  },
  review: {
    type: String,
    required: [true, 'Review text is required'],
    maxlength: [1000, 'Review cannot exceed 1000 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  image: {
    url: String,
    publicId: String,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

testimonialSchema.index({ isVisible: 1, displayOrder: 1 });

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);