import { Router } from 'express';
import * as settingsController from '../controllers/settingsController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', settingsController.getSettings);
router.put('/', protect, settingsController.updateSettings);

export default router;