import express from 'express';
import { addPost } from '../controllers/post.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();

router.post('/:familyId', isAuthenticated, addPost);

export default router;