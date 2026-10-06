import { Response } from 'express';
import Category from '../models/Category';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import { slugify } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';

export const getCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { active } = req.query;

    const query: any = {};
    if (active === 'true') query.isActive = true;

    const categories = await Category.find(query)
      .sort({ displayOrder: 1, name: 1 })
      .lean();

    // Populate product count
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id, isAvailable: true });
        return { ...cat, productCount: count };
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get categories', 500);
  }
};

export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, displayOrder } = req.body;

    if (!req.file) {
      throw new AppError('Category image is required', 400);
    }

    const imageUpload = await uploadToCloudinary(req.file, 'minals-art-corner/categories');

    const category = await Category.create({
      name,
      slug: slugify(name),
      description,
      image: imageUpload,
      displayOrder: parseInt(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create category', 500);
  }
};

export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, displayOrder, isActive } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    if (req.file) {
      await deleteFromCloudinary(category.image.publicId);
      const imageUpload = await uploadToCloudinary(req.file, 'minals-art-corner/categories');
      category.image = imageUpload;
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name);
    }
    if (description !== undefined) category.description = description;
    if (displayOrder !== undefined) category.displayOrder = parseInt(displayOrder) || 0;
    if (isActive !== undefined) category.isActive = isActive === 'true';

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
      message: 'Category updated successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update category', 500);
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const productCount = await Product.countDocuments({ category: category._id });
    if (productCount > 0) {
      throw new AppError('Cannot delete category with existing products', 400);
    }

    await deleteFromCloudinary(category.image.publicId);
    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete category', 500);
  }
};

export const reorderCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories)) {
      throw new AppError('Categories array is required', 400);
    }

    await Promise.all(
      categories.map((cat: { id: string; displayOrder: number }) =>
        Category.findByIdAndUpdate(cat.id, { displayOrder: cat.displayOrder })
      )
    );

    res.status(200).json({
      success: true,
      message: 'Categories reordered successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to reorder categories', 500);
  }
};