import express from 'express';
import { getPosts } from '../controllers/post.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();

router.get('/:familyId', isAuthenticated, getPosts);

export default router;