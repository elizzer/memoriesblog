import express from 'express';
const router =express.Router();

//controllers
import {login,adminAuth} from '../controller/adminLogin.js'

router.post('/',login);
router.get('/auth',adminAuth);

export default router;