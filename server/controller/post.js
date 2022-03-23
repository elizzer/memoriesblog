const postModal = require('../model/post.js');
const multer = require('multer');
const path = require('path');
const {v4} = require('uuid');

var photoName;

exports.createPost=(req,res)=>{

    console.log('[+]Log from createpost',req.photoName)
    var post =new postModal(req.body);
    post.photoName=photoName;
    
    post.save((err,post)=>{
        if(err||!post){
           return res.status(400).json({err:'unable to save the post'})
        }
        
        res.json({code:1,msg:"post Saved and published successfully"});

    })
}



exports.createPhotoLocation=()=>{
    photoName=v4()+'-'+Date.now()+'.png';
    return photoName;
}

const storageEngine = multer.diskStorage({
    destination:'./uploads',
    filename:function (req,file,cb){
        cb(
        null,
        createPhotoLocation()
      )
    }
})

const fileFilter = (req, file, cb) => {
    const fileTypes=['image/jpeg','image/jpg','image/png'];
    if(fileTypes.includes(file.mimetype)){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
  };

  exports.upload = multer ({
    storage: storageEngine,
    fileFilter  
  });



  exports.getAllPost=(req,res)=>{
    postModal.find((err,data)=>{
        res.json(data);
    })
}

exports.byPhotoName=(req,res,next,photoName)=>{

    req.photoName=photoName;
    console.log('[+]log from photo request',req.photoName)
    next();

}


exports.getPopularPost=(req,res)=>{
    postModal.find().sort([['likeCount','desc']]).limit(4).exec((err,data)=>{
        if(err||!data){
            return res.json({error:"No post fetched"})
        }

        res.json(data);
    })
}

exports. byPostId=(req,res,next,id)=>{
    postModal.findById(id).exec((err,data)=>{
        if(err||!data)
            return res.json({msg:"Post not found"});
        
        req.post=data;
        console.log(req.post)
        next();
    })
}

exports.postById=(req,res)=>{
        console.log('[+]parameter data',req.post)
        res.json(req.post);
}

exports.deletePost=(req,res)=>{
    postModal.deleteOne({_id:req.post.id},(err,data)=>{
        if(err||!data){
            return res.json({err:"post not found"})
        }
        res.json({code:true,msg:'Post deleted'})
    })
}

exports.like=(req,res)=>{
    postModal.findByIdAndUpdate(req.post._id,{likeCount:req.post.likeCount+1},{new:true},(err,data)=>{
        if(err||!data){
            return res.json({err:'cant like this post'})
        }
        res.json({msg:'updated'})
    })
}