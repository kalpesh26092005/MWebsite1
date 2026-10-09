import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', protect, uploadSingle('image'), asyncHandler(uploadController.uploadImage));
router.delete('/:publicId', protect, asyncHandler(uploadController.deleteImage));

export default router;