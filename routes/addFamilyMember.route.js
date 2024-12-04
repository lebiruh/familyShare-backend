import express from 'express';
import { addFamilyMember } from '../controllers/addFamilyMember.controller.js';
import {isAuthenticated} from "../middleware/middleware.js";


const router = express.Router();

router.post('/:familyId', isAuthenticated, addFamilyMember);

export default router;