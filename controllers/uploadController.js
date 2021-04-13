const multer=require('multer');
const path=require('path');
const fs=require('fs');
const AppError = require('../config/error');
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
 
       // Uploads is the Upload_folder_name
       fs.mkdir("./studentImages/"+req.params.user_id,(error)=>{
        if(error) console.log(error);
        cb(null, "./studentImages/"+req.params.user_id);
       });
       
   },
   filename: function (req, file, cb) {
     cb(null, req.params.user_id+"_"+Date.now()+".jpg");
   }
 })

 module.exports= multer({ 
   storage: storage,
   //limits: { fileSize: maxSize },
   fileFilter: function (req, file, cb){
   
       // Set the filetypes, it is optional
       var filetypes = /jpeg|jpg|png/;
       var mimetype = filetypes.test(file.mimetype);
 
       var extname = filetypes.test(path.extname(
                   file.originalname).toLowerCase());
       
       if (mimetype && extname) {
           return cb(null, true);
       }
     
       cb("Error: File upload only supports the "
               + "following filetypes - " + filetypes);
     } 
 

}) ;