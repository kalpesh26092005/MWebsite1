import { Router } from 'express';
import { body } from 'express-validator';
import * as categoryController from '../controllers/categoryController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { validate } from '../middleware/validate';

const router = Router();

router.get('/', categoryController.getCategories);

router.post(
  '/',
  protect,
  uploadSingle('image'),
  [
    body('name').notEmpty().withMessage('Category name is required'),
  ],
  validate,
  categoryController.createCategory
);

router.put(
  '/:id',
  protect,
  uploadSingle('image'),
  categoryController.updateCategory
);

router.delete('/:id', protect, categoryController.deleteCategory);

router.put('/reorder', protect, categoryController.reorderCategories);

export default router;