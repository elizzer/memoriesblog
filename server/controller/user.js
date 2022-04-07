const User = require("../model/user.js");
const JWT = require('jsonwebtoken')

exports.register=(req,res)=>{
    const newUser=new User(req.body)
    if(!req.body.userName){
        return res.json({code:0,err:"Username is required"})
    }
    if(!req.body.email){
        return res.json({code:0,err:"email is required"})
    }
    if(!req.body.password){
        return res.json({code:0,err:"password is required"})
    }
    newUser.save((err,data)=>{
        if(err||!data)
        {   
            console.log(err.message)
            var field=err.message.split(' ')[11];
            var error=err.message.split(' ')[0];
            if(error==='E11000')
            {
                return res.json({code:0,err:`The ${field} already exists`})
                
            }
            error=err.message.split(':')[2].split(',')[0];
            console.log('[+]Error from mongoose',err.message.split(':')[2].split(',')[0])
            return res.json({code:0,err:error})

       }
        else{
            console.log('[+]User registered succesfully')
            res.status(200).json({code:1,msg:"User registration success"})
        }
    });
    
}

exports.signIn=(req,res)=>{
    console.log('[+]Log in datials',req.body);
    const {email,password}=req.body;
    User.findOne({email:email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({code:0,err:"User not found"})
        }
        console.log('[+]User detailes',user)
        if(user.authenticate(password)){
            console.log('[+]Pass word matched')
            const token = JWT.sign({_id:user._id},process.env.SECRET_KEY)
            console.log('[+]signin token',token)
            const {_id,userName}=user
            return res.status(200).json({code:1,msg:"User signin Success",token:token,id:_id,userName:userName})
        }
        res.json({code:0,err:"email and password does not match"})
    })
}

exports.userAuth=(req,res)=>{
    const token= req.headers['authorization'].split(' ')[1];
    JWT.verify(token,process.env.SECRET_KEY,(err,data)=>{
        if(err||!data){
            return res.status(401).json({code:0,err:"User not signedin!!"})
        }
        console.log(data._id);
        User.findById(data._id,(err,data)=>{
            if(err||!data){
                return res.status(401).json({code:0,err:"User not signedin"})
            }
            return res.json({code:1,id:data._id,userName:data.userName});
        })
    })
}

exports.byUserId=(req,res,next,id)=>{
    
    User.findById(id,(err,user)=>{
        if(err||!user){
            return res.json({code:0,err:"User not found"})
        }
        req.user=user
        next()
    })

}