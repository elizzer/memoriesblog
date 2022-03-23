const crypto = require('crypto');
const mongoose = require("mongoose");
const uuid = require('uuid');

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        unique:[true,'Enter a unique username'],
        required:[true, "Enter a userName"],
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true, "Enter a Email"],
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
    this.salt=uuid.v4();
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

UserSchema.methods.authenticate=function(password){
     return this.encrytPassword(password)===this.hashedPassword;
}

module.exports=mongoose.model('user',UserSchema);