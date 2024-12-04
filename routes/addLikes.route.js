import express from 'express';
import { addLike} from '../controllers/like.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();

router.post('/:postId', isAuthenticated, addLike);

export default router;