const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
    },
    likedBy:[{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    }],
    comments:[String],
    photoName:[String],
    tags:[String]
     
    

},{ timestamps: true });

const postModel= mongoose.model('post',postSchema);
module.exports=postModel