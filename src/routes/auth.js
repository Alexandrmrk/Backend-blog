import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);

export default router;
