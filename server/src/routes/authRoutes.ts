import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  authController.login
);

router.post('/logout', authController.logout);

router.get('/me', protect, authController.getMe);

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  ],
  validate,
  authController.changePassword
);

export default router;