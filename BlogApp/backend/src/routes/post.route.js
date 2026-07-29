import express from 'express'
import { createPost, getAllPosts,getPost } from '../controllers/post.controller.js';
import { IdentifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();




router.post("/create",IdentifyUser,createPost)
router.get("/",getAllPosts)
router.get("/:postId",getPost)



export default router