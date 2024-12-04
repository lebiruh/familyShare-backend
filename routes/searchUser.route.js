import express from 'express';
import { searchUser } from '../controllers/searchUser.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();


router.get('/', isAuthenticated, searchUser);

export default router;