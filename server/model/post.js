import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
    },
<<<<<<< HEAD
    likedBy:[{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }],
    comments:[String],
    photoName:[String],
    tags:[String]
     
=======

    likeCount:{
        type:Number,
        default:0,
    },
 
    photoName:{
        type:String,
    }

>>>>>>> parent of ed73868 (user registration and signing completed)
    

},{ timestamps: true });

const postModel= mongoose.model('post',postSchema);
export default postModel;