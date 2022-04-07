import express from 'express';
const router =express.Router();
<<<<<<< HEAD
const {createPost,upload,userPosts ,getAllPost,byPhotoName,getPopularPost,byPostId,deletePost,postById,like} = require('../controller/post.js');
const {byUserId} = require('../controller/user')
const {v4} = require('uuid');
const {dirName} = require('../uploads/dir.js')
=======
import {createPost,upload, getAllPost,byPhotoName,getPopularPost,byPostId,deletePost,postById,like} from '../controller/post.js';

import {dirName} from '../uploads/dir.js'
>>>>>>> parent of ed73868 (user registration and signing completed)


router.get('/',getAllPost)

router.post('/:userId',(req,res,next)=>{
    req.photoName=v4()+".png"
    next()
},upload.single('photo'),createPost)

router.get('/posts/:userId',userPosts)

router.get('/popular',getPopularPost)

router.get('/:postId',postById)

router.get('/like/:postId',like)

router.delete('/:postId',deletePost)


router.get('/photo/:photoName',(req,res)=>{
    res.sendFile(dirName+'/'+req.photoName)
})


router.param("photoName",byPhotoName);
router.param('postId',byPostId);
router.param('userId',byUserId)

export default router;