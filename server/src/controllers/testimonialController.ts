import { Response } from 'express';
import Testimonial from '../models/Testimonial';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import { AppError } from '../middleware/errorHandler';

export const getTestimonials = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { visible } = req.query;

    const query: any = {};
    if (visible === 'true') query.isVisible = true;

    const testimonials = await Testimonial.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get testimonials', 500);
  }
};

export const createTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { customerName, review, rating, displayOrder } = req.body;

    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file, 'minals-art-corner/testimonials');
    }

    const testimonial = await Testimonial.create({
      customerName,
      review,
      rating: parseInt(rating),
      image,
      displayOrder: parseInt(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create testimonial', 500);
  }
};

export const updateTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { customerName, review, rating, isVisible, displayOrder } = req.body;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    if (req.file) {
      if (testimonial.image) {
        await deleteFromCloudinary(testimonial.image.publicId);
      }
      testimonial.image = await uploadToCloudinary(req.file, 'minals-art-corner/testimonials');
    }

    if (customerName) testimonial.customerName = customerName;
    if (review) testimonial.review = review;
    if (rating) testimonial.rating = parseInt(rating);
    if (isVisible !== undefined) testimonial.isVisible = isVisible === 'true';
    if (displayOrder !== undefined) testimonial.displayOrder = parseInt(displayOrder) || 0;

    await testimonial.save();

    res.status(200).json({
      success: true,
      data: testimonial,
      message: 'Testimonial updated successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update testimonial', 500);
  }
};

export const deleteTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    if (testimonial.image) {
      await deleteFromCloudinary(testimonial.image.publicId);
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete testimonial', 500);
  }
};

export const reorderTestimonials = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { testimonials } = req.body;

    if (!Array.isArray(testimonials)) {
      throw new AppError('Testimonials array is required', 400);
    }

    await Promise.all(
      testimonials.map((t: { id: string; displayOrder: number }) =>
        Testimonial.findByIdAndUpdate(t.id, { displayOrder: t.displayOrder })
      )
    );

    res.status(200).json({
      success: true,
      message: 'Testimonials reordered successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to reorder testimonials', 500);
  }
};