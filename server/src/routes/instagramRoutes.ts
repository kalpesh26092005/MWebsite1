import { Router } from 'express';
import * as instagramController from '../controllers/instagramController';
import { protect } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.get('/', instagramController.getInstagramPosts);
router.post('/', protect, uploadSingle('image'), instagramController.createInstagramPost);
router.delete('/:id', protect, instagramController.deleteInstagramPost);

export default router;