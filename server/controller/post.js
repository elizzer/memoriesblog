import postModal from '../model/post.js';
import multer from 'multer';
import path from 'path';
import {v4} from 'uuid';

var photoName;

export function createPost(req,res){

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



export function createPhotoLocation(){
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

 export const upload = multer ({
    storage: storageEngine,
    fileFilter  
  });



export function getAllPost(req,res){
    postModal.find((err,data)=>{
        res.json(data);
    })
}

export function byPhotoName(req,res,next,photoName){

    req.photoName=photoName;
    console.log('[+]log from photo request',req.photoName)
    next();

}


export function getPopularPost(req,res){
    postModal.find().sort([['likeCount','desc']]).limit(4).exec((err,data)=>{
        if(err||!data){
            return res.json({error:"No post fetched"})
        }

        res.json(data);
    })
}

export function byPostId(req,res,next,id){
    postModal.findById(id).exec((err,data)=>{
        if(err||!data)
            return res.json({msg:"Post not found"});
        
        req.post=data;
        console.log(req.post)
        next();
    })
}

export function postById(req,res){
        console.log('[+]parameter data',req.post)
        res.json(req.post);
}

export function deletePost(req,res){
    postModal.deleteOne({_id:req.post.id},(err,data)=>{
        if(err||!data){
            return res.json({err:"post not found"})
        }
        res.json({code:true,msg:'Post deleted'})
    })
}

export function like(req,res){
    postModal.findByIdAndUpdate(req.post._id,{likeCount:req.post.likeCount+1},{new:true},(err,data)=>{
        if(err||!data){
            return res.json({err:'cant like this post'})
        }
        res.json({msg:'updated'})
    })
}