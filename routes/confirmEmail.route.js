import express from 'express';
import { confirmEmail } from '../controllers/confirmEmail.controller.js';


const router = express.Router();


router.post('/email', confirmEmail);


export default router;