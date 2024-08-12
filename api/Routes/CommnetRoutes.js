import express from 'express';
import { createComment, deleteComment, editComment, getPostComments, likeComment } from '../Controllers/CommentController.js';
import {verifyToken} from '../Utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likecomment/:commentId',verifyToken,likeComment);
router.put('/editcomment/:commentId',verifyToken,editComment);
router.delete('/deletecomment/:commentId',verifyToken,deleteComment);

export default router;