import { Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import { AuthRequest } from '../middleware/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import { slugify } from '../utils/helpers';
import { AppError } from '../middleware/errorHandler';
import mongoose from 'mongoose';

interface ProductQuery {
  category?: string;
  search?: string;
  featured?: string;
  available?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export const getProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      category,
      search,
      featured,
      available,
      sort = '-createdAt',
      page = '1',
      limit = '12',
    } = req.query as ProductQuery;

    const query: any = {};

    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (available === 'true') query.isAvailable = true;
    if (search) {
      query.$text = { $search: search };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const sortOptions: any = {};
    switch (sort) {
      case 'price-asc':
        sortOptions.price = 1;
        break;
      case 'price-desc':
        sortOptions.price = -1;
        break;
      case 'popular':
        sortOptions.viewCount = -1;
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1;
        break;
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category', 'name slug')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get products', 500);
  }
};

export const getFeaturedProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ isFeatured: true, isAvailable: true })
      .populate('category', 'name slug')
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(8)
      .lean();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get featured products', 500);
  }
};

export const getProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .lean();

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Increment view count
    await Product.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get product', 500);
  }
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, price, priceLabel, category, isFeatured, isAvailable, isCustomizable, tags, displayOrder } = req.body;

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new AppError('At least one image is required', 400);
    }

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      throw new AppError('Category not found', 404);
    }

    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      (req.files as Express.Multer.File[]).map(file => uploadToCloudinary(file, 'minals-art-corner/products'))
    );

    const product = await Product.create({
      name,
      slug: slugify(name),
      description,
      price: parseFloat(price),
      priceLabel,
      category,
      images: imageUploads,
      isFeatured: isFeatured === 'true',
      isAvailable: isAvailable !== 'false',
      isCustomizable: isCustomizable === 'true',
      tags: tags ? tags.split(',').map((t: string) => t.trim()) : [],
      displayOrder: parseInt(displayOrder) || 0,
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to create product', 500);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description, price, priceLabel, category, isFeatured, isAvailable, isCustomizable, tags, displayOrder, removeImages } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (category) {
      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) {
        throw new AppError('Category not found', 404);
      }
    }

    // Handle image removal
    if (removeImages) {
      const publicIds = JSON.parse(removeImages);
      await Promise.all(publicIds.map((id: string) => deleteFromCloudinary(id)));
      product.images = product.images.filter(img => !publicIds.includes(img.publicId));
    }

    // Upload new images
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUploads = await Promise.all(
        (req.files as Express.Multer.File[]).map(file => uploadToCloudinary(file, 'minals-art-corner/products'))
      );
      product.images.push(...imageUploads);
    }

    if (name) {
      product.name = name;
      product.slug = slugify(name);
    }
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (priceLabel !== undefined) product.priceLabel = priceLabel;
    if (category) product.category = new mongoose.Types.ObjectId(category);
    if (isFeatured !== undefined) product.isFeatured = isFeatured === 'true';
    if (isAvailable !== undefined) product.isAvailable = isAvailable !== 'false';
    if (isCustomizable !== undefined) product.isCustomizable = isCustomizable === 'true';
    if (tags) product.tags = tags.split(',').map((t: string) => t.trim());
    if (displayOrder !== undefined) product.displayOrder = parseInt(displayOrder) || 0;

    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to update product', 500);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Delete images from Cloudinary
    await Promise.all(product.images.map(img => deleteFromCloudinary(img.publicId)));

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to delete product', 500);
  }
};