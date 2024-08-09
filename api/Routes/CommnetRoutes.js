import express from 'express';
import { createComment, getPostComments, likeComment } from '../Controllers/CommentController.js';
import {verifyToken} from '../Utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likecomment/:commentId',verifyToken,likeComment);

export default router;