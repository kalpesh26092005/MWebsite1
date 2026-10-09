import { Router } from 'express';
import * as instagramController from '../controllers/instagramController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(instagramController.getInstagramPosts));
router.post('/', protect, uploadSingle('image'), asyncHandler(instagramController.createInstagramPost));
router.delete('/:id', protect, asyncHandler(instagramController.deleteInstagramPost));

export default router;