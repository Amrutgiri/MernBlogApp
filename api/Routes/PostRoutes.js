import express from 'express';
import { create, deletepost, getposts, updatepost } from '../Controllers/PostController.js';
import {verifyToken} from '../Utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost);
router.put('/updatepost/:postId/:userId',verifyToken,updatepost);
export default router;