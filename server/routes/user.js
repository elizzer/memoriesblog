const express = require('express')
const router = express.Router();
const {register,signIn,userAuth} = require('../controller/user')

router.post('/register',register)
router.post('/signin',signIn)
router.get('/userauth',userAuth)


module.exports=router;