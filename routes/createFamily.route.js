import express from 'express';
import {createFamily} from "../controllers/createFamily.controller.js";
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();

router.post('/:userId', isAuthenticated, createFamily);

export default router;