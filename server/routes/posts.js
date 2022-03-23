const express = require('express');
const router =express.Router();
const {createPost,upload, getAllPost,byPhotoName,getPopularPost,byPostId,deletePost,postById,like} = require('../controller/post.js');

const {dirName} = require('../uploads/dir.js')


router.get('/',getAllPost)

router.post('/',upload.single('photo'),createPost)

router.get('/popular',getPopularPost)

router.get('/:postId',postById)

router.get('/like/:postId',like)

router.delete('/:postId',deletePost)

router.get('/photo/:photoName',(req,res)=>{
    res.sendFile(dirName+'/'+req.photoName)
})


router.param("photoName",byPhotoName);
router.param('postId',byPostId);

module.exports=router;