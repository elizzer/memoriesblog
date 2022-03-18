import express from 'express';
const router = express.Router();
import User from '../model/user.js'

router.post('/login',(req,res)=>{

    const newUser= new User(req.body);

    console.log('[+]User login request',req.body);
})

export default router;