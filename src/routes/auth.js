import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/auth', AuthController.auth);

export default router;
