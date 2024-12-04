import express from 'express';
import { getLikes } from '../controllers/like.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";



const router = express.Router();


router.get('/:postId', isAuthenticated, getLikes);


export default router;