import express from 'express';
import { addComment, getComments} from '../controllers/comment.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/:postId', isAuthenticated, getComments);
router.post('/:postId', isAuthenticated, addComment);

export default router;