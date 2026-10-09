import { Router } from 'express';
import { body } from 'express-validator';
import * as testimonialController from '../controllers/testimonialController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(testimonialController.getTestimonials));

router.post(
  '/',
  protect,
  uploadSingle('image'),
  [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('review').notEmpty().withMessage('Review is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ],
  validate,
  asyncHandler(testimonialController.createTestimonial)
);

router.put(
  '/:id',
  protect,
  uploadSingle('image'),
  asyncHandler(testimonialController.updateTestimonial)
);

router.delete('/:id', protect, asyncHandler(testimonialController.deleteTestimonial));

router.put('/reorder', protect, asyncHandler(testimonialController.reorderTestimonials));

export default router;