import express from 'express';
import { getUserById } from '../controllers/user.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/findById/:id', isAuthenticated, getUserById);

export default router;