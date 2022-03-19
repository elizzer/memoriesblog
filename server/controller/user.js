import User from "../model/user.js";

export function register(req,res){
    const newUser=new User(req.body)
    newUser.save((err,data)=>{
        if(err||!data)
        {
               const field=err.message.split(' ')[11];
            const error=err.message.split(' ')[0];
            console.log(error,' @ ',field);
            if(error==='E11000')
            {
                return res.json({err:`The ${field} already exists`})

            }
        }
        else{
            console.log('[+]User registered succesfully')
            res.status(200).json({code:1})
        }
    });
    
}