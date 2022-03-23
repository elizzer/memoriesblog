
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')

//routes
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())
app.use('/post',postRoutes);
app.use('/user',userRoutes);



mongoose.connect(process.env.DATABASE).then(()=>console.log("[+]Database ready to server")).catch(()=>console.log('[+]Problem with mongodb database, might be db server offline'))
app.listen(process.env.SERVER_PORT,()=>{console.log('[+]Server up and running on ',process.env.SERVER_PORT)})