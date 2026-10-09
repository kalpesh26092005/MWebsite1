import { Router } from 'express';
import { body } from 'express-validator';
import * as productController from '../controllers/productController';
import { protect } from '../middleware/auth';
import { uploadMultiple } from '../middleware/upload';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Public routes
router.get('/', asyncHandler(productController.getProducts));
router.get('/featured', asyncHandler(productController.getFeaturedProducts));
router.get('/:id', asyncHandler(productController.getProduct));

// Admin routes
router.post(
  '/',
  protect,
  uploadMultiple('images', 5),
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isMongoId().withMessage('Valid category ID is required'),
  ],
  validate,
  asyncHandler(productController.createProduct)
);

router.put(
  '/:id',
  protect,
  uploadMultiple('images', 5),
  asyncHandler(productController.updateProduct)
);

router.delete('/:id', protect, asyncHandler(productController.deleteProduct));

export default router;