import express from 'express';
import { create } from '../Controllers/PostController.js';
import {verifyToken} from '../Utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,create);


export default router;