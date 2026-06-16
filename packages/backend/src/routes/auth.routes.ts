import { Router, Request, Response } from 'express';
import { registerStaff, loginStaff, getProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';

const router: Router = Router();

router.post('/register', registerStaff);
router.post('/login', loginStaff);
router.get('/profile', authMiddleware, getProfile);

export default router;
