import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));


mongoose.connect(process.env.DATABASE).then(()=>console.log("[+]Database ready to server"))
app.listen(process.env.SERVER_PORT,()=>{console.log('[+]Server up and running on ',process.env.SERVER_PORT)})