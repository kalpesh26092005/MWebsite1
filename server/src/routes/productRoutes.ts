import { Router } from 'express';
import { body } from 'express-validator';
import * as productController from '../controllers/productController';
import { protect } from '../middleware/auth';
import { uploadMultiple } from '../middleware/upload';
import { validate } from '../middleware/validate';

const router = Router();

// Public routes
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/:id', productController.getProduct);

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
  productController.createProduct
);

router.put(
  '/:id',
  protect,
  uploadMultiple('images', 5),
  productController.updateProduct
);

router.delete('/:id', protect, productController.deleteProduct);

export default router;