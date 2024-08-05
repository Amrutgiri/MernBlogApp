import express from 'express';
import { create, getposts } from '../Controllers/PostController.js';
import {verifyToken} from '../Utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getposts);

export default router;