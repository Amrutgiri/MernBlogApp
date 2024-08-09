import express from 'express';
import { createComment } from '../Controllers/CommentController.js';
import {verifyToken} from '../Utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);

export default router;