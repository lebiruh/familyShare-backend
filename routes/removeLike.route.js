import express from 'express';
import { removeLike } from '../controllers/like.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";



const router = express.Router();


router.post('/:postId', isAuthenticated, removeLike);


export default router;