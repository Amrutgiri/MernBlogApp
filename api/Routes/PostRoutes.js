import express from 'express';
import { create, getPost } from '../Controllers/PostController.js';
import {verifyToken} from '../Utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getPost);

export default router;