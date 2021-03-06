import crypto from 'crypto';
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    about:{
        type:String
    },
    posts:[{
        type:mongoose.Schema.ObjectId,
        ref:'posts'
    }],
    likedPosts:[{
        type:mongoose.Schema.ObjectId,
        ref:'posts'
    }],
    salt:{
        type:String,
    },
    hashedPassword:{
        type:String,
        required:true
    },

},{ timestamps: true })

UserSchema.virtual('password').set(function(password){
    this._password=password;
    this.salt=uuidv4();
    this.hashedPassword=this.encrytPassword(password)
})
.get(function(){
    return this._password;
})

UserSchema.methods.encrytPassword=function(password){
    if(!password){
        return '';
    }
    try{
        return crypto.createHmac('sha1',this.salt).update(password).digest('hex')
    }
    catch(err){
        return '';
    }
}

const User = mongoose.model('user',UserSchema);

export default User;