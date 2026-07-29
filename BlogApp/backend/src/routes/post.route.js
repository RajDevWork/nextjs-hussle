import express from 'express'
import { createPost } from '../controllers/post.controller.js';
import { IdentifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();




router.post("/create",IdentifyUser,createPost)



export default router