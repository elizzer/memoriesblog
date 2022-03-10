import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
    },

    likeCount:{
        type:Number,
        default:0,
    },
    tags:[String],
    photoName:{
        type:String,
    }

    

},{ timestamps: true });

const postModel= mongoose.model('post',postSchema);
export default postModel;