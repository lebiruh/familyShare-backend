import express from 'express';
import { getUser } from '../controllers/user.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/find/:userEmail', isAuthenticated, getUser);

export default router;