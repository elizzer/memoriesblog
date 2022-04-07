import mongoose from 'mongoose';

const adminSchema=mongoose.Schema({
    name:{
        type:String,
        default:'admin',
    },
    password:{
        type:String,
        default:'admin',
    }
});

const adminModel= mongoose.model('admin',adminSchema);

export default adminModel;