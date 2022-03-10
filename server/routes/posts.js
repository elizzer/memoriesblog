import express from 'express';
const router =express.Router();
import {createPost,upload, getAllPost,createPhotoLocation} from '../controller/post.js';

import {dirName} from '../uploads/dir.js'


router.get('/',getAllPost)

router.post('/',upload.single('photo'),createPost)



router.get('/photo',(req,res)=>{
    res.sendFile(dirName+'/096d4c46-9179-465d-ba11-d1481ab85d92-1646935028150.png')
})


export default router;