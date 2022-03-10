import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

//routes
import postRoutes from './routes/posts.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use('/post',postRoutes);
app.use('/admin',adminRoutes)



mongoose.connect(process.env.DATABASE).then(()=>console.log("[+]Database ready to server")).catch(()=>console.log('[+]Problem with mongodb database, might be db server offline'))
app.listen(process.env.SERVER_PORT,()=>{console.log('[+]Server up and running on ',process.env.SERVER_PORT)})