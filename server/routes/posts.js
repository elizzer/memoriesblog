import express from 'express';
const router =express.Router();
import {createPost,upload, getAllPost,byPhotoName} from '../controller/post.js';

import {dirName} from '../uploads/dir.js'


router.get('/',getAllPost)

router.post('/',upload.single('photo'),createPost)



router.get('/photo/:photoName',(req,res)=>{
    res.sendFile(dirName+'/'+req.photoName)
})

router.param("photoName",byPhotoName);

export default router;