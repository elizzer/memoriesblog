import express from 'express';
const router = express.Router();
import {register} from '../controller/user.js'

router.post('/login',register)

export default router;