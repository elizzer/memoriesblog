import adminModel from "../model/admin.js";
import JWT from 'jsonwebtoken'

export function login(req,res){
    adminModel.findOne({name:req.body.name},(err,data)=>{
        if(err||!data){
            return res.status(400).json({msg:'credential not true'})
        }
        else{
            if(data.name==req.body.name&& data.password==req.body.password){
                console.log('[+]admin login success')
                const token=JWT.sign({_id:data._id},process.env.SECRET_KEY,{expiresIn:'1h'});
                res.cookie('token',token);
                return res.json({msg:"Admin login success",token})
            }
        }
        res.status(400).json({msg:'credentials does not match'})
    })
    
}

export function adminAuth(req,res){
    console.log('[+]Admin auth',req.header('authorization'));
    const btoken= req.header('authorization').split(' ')[1];
    JWT.verify(btoken,process.env.SECRET_KEY,(err,data)=>{
        if(err||!data){
            return res.json({err:"invalid token"})
        }

        adminModel.findById(data._id,(err,user)=>{
            if(err||!user){
                return res.json({err:'user not authorized'})
            }

            res.json({msg:'Admin authorised'})
        })
        console.log('[+] Data from token',data)
    })
    
}