const mongoose=require('mongoose');
const { user } = require('../config/db');
const constants=require('../constants/constants');
const usersSchema=new mongoose.Schema({
   username:{
      type:String,
      required:true,
      unique:true
   },
   eamil_id:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      required:true,
      type:String
   },
   user_type:{
      type:String,
      required:true,
      enum:[constants.student,constants.teacher,constants.admin]
   },
   org_id:{   
      type:mongoose.Schema.Types.ObjectId,
      ref:"organizations"
   }
},{
   timestamps:true
});

const users=mongoose.model("users",usersSchema);
module.exports=users;