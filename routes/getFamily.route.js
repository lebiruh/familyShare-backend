import express from 'express';
import { getFamily } from '../controllers/getFamily.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";

const router = express.Router();


router.get('/:userId', isAuthenticated, getFamily);


export default router;