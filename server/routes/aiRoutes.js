import express from 'express';
import { getRecommendation, rankEmployees } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/recommend', getRecommendation);
router.post('/rank', rankEmployees);

export default router;
