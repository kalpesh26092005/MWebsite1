import { Response } from 'express';
import InstagramPost from '../models/InstagramPost';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import { AppError } from '../middleware/errorHandler';

export const getInstagramPosts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const posts = await InstagramPost.find()
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get Instagram posts', 500);
  }
};

export const createInstagramPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { postUrl, caption, displayOrder } = req.body;

    if (!req.file) {
      throw new AppError('Image is required', 400);
    }

    const image = await uploadToCloudinary(req.file, 'minals-art-corner/instagram');

    const post = await InstagramPost.create({
      image,
      postUrl,
      caption,
      displayOrder: parseInt(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      data: post,
      message: 'Instagram post added successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create Instagram post', 500);
  }
};

export const deleteInstagramPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await InstagramPost.findById(req.params.id);
    if (!post) {
      throw new AppError('Instagram post not found', 404);
    }

    await deleteFromCloudinary(post.image.publicId);
    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Instagram post deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete Instagram post', 500);
  }
};