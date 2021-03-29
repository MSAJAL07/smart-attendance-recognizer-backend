console.log("Jai Shree Ganesh")
const express=require('express');
const bodyParser=require('body-parser');

const envFile=require('dotenv');
envFile.config();

const config=require('./config/config');
const routes=require('./routes/router');
const db=require('./config/db');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended:true
}));
app.use('/api/v1/',routes);

db.on('connected',()=>console.log("Succesfully connected to database!!"));
app.listen(config.server.port,()=>{console.log("Server started and listening on port:",config.server.port)});

