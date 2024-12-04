import express from 'express';
import { deletePost } from '../controllers/post.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


// router.get('/:familyId', getPosts);
router.delete('/:postId', isAuthenticated, deletePost);

export default router;