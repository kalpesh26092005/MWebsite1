import { Router } from 'express';
import { body } from 'express-validator';
import * as categoryController from '../controllers/categoryController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(categoryController.getCategories));

router.post(
  '/',
  protect,
  uploadSingle('image'),
  [
    body('name').notEmpty().withMessage('Category name is required'),
  ],
  validate,
  asyncHandler(categoryController.createCategory)
);

router.put(
  '/:id',
  protect,
  uploadSingle('image'),
  asyncHandler(categoryController.updateCategory)
);

router.delete('/:id', protect, asyncHandler(categoryController.deleteCategory));

router.put('/reorder', protect, asyncHandler(categoryController.reorderCategories));

export default router;