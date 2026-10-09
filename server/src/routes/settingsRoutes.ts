import { Router } from 'express';
import * as settingsController from '../controllers/settingsController';
import { protect } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(settingsController.getSettings));
router.put('/', protect, asyncHandler(settingsController.updateSettings));

export default router;