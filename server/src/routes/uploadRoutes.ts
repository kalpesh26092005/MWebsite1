import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.post('/', protect, uploadSingle('image'), uploadController.uploadImage);
router.delete('/:publicId', protect, uploadController.deleteImage);

export default router;