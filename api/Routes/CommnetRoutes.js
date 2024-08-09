import express from 'express';
import { createComment, getPostComments } from '../Controllers/CommentController.js';
import {verifyToken} from '../Utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
export default router;