import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import { AppError } from '../middleware/errorHandler';

export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    const result = await uploadToCloudinary(req.file, 'minals-art-corner/general');

    res.status(200).json({
      success: true,
      data: result,
      message: 'Image uploaded successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to upload image', 500);
  }
};

export const deleteImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      throw new AppError('Public ID is required', 400);
    }

    await deleteFromCloudinary(publicId);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete image', 500);
  }
};