import mongoose, { Document, Schema } from 'mongoose';

export interface IInstagramPost extends Document {
  image: {
    url: string;
    publicId: string;
  };
  postUrl?: string;
  caption?: string;
  displayOrder: number;
}

const instagramPostSchema = new Schema<IInstagramPost>({
  image: {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  postUrl: {
    type: String,
    trim: true,
  },
  caption: {
    type: String,
    trim: true,
    maxlength: [500, 'Caption cannot exceed 500 characters'],
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

instagramPostSchema.index({ displayOrder: 1 });

export default mongoose.model<IInstagramPost>('InstagramPost', instagramPostSchema);