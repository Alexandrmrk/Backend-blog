import { Router } from 'express';
import PostsController from '../controllers/PostsController';
import Authorize from '../middleware/Authorize';

const router = Router();

router.get('/post/:id', PostsController.read);
router.get('/posts', PostsController.list);
router.post('/posts', Authorize.check, PostsController.create);
router.put('/posts/:id', Authorize.check, PostsController.update);
router.delete('/posts/:id', Authorize.check, PostsController.delete);

export default router;
