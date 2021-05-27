const multer=require('multer');
const path=require('path');
const fs=require('fs');
const AppError = require('../config/error');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.png')
  }
})

 module.exports= multer({ 
  storage: storage
}) ;