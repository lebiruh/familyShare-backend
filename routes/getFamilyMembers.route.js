import express from 'express';
import { getFamilyMembers } from '../controllers/getFamilyMembers.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";

const router = express.Router();


router.get('/:familyId', isAuthenticated, getFamilyMembers);


export default router;