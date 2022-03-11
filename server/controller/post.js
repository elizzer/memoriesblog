import postModal from '../model/post.js';
import multer from 'multer';
import path from 'path';
import {v4} from 'uuid';

var photoName;

export function createPost(req,res){

    console.log('[+]Log from createpost',req.photoName)
    var post =new postModal(req.body);
    post.photoName=photoName;
    var tags= req.body.tags;
    tags=tags.split('#');
    tags=tags.slice(1,tags.length);
    post.tags=tags;
    post.save((err,post)=>{
        if(err||!post){
           return res.status(400).json({err:'unable to save the post'})
        }
        
        res.json(post);

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
