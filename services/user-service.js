const userModel=require('../models/users');
const bcrypt=require('bcrypt');
const constants=require('../constants/constants');
const authService=require('../services/auth-service');
const studentModel=require('../models/users');
const teacherModel=require('../models/teachers');

module.exports.login=async (data) =>{
   var user=null;
   var token;
   var result;
   if(data.email_id!=undefined)
   {  
      user=await userModel.findOne({email_id:data.email_id});
   }
   else if(data.username!=undefined)
   {
      user=await userModel.findOne({username:data.username});
   }
   if(user)
   {
      var password=user.password;
      var matched=await bcrypt.compare(data.password,password);
      if(matched)
      {
         token=await authService.generateToken({id:user._id,user_type:user.user_type,org_id:user.org_id});
         return {
            status:true,
            data:user,
            token:token,
            message:"Logged in successfully"
         }
      } 
      else
      {
         return {
            status:false,
            statuscode: constants.statuscodes.invalid,
            message: "Invalid username or password"
         }
      }
   }
   else
   {
      return {
         status:false,
         statuscode: constants.statuscodes.invalid,
         message: "Invalid username or password"
      }
   }
}

module.exports.getUserProfile= async (user)=>{
   var profile=null;
   if(user.user_type==constants.roles.student)
   {
      profile=await studentModel.findOne({user_id:user.id});
   }
   else if(user.user_type==constants.roles.teacher)
   {
      profile=await teacherModel.findOne({user_id:user.id});
   }
   if(profile)
   {
      return {
         status:true,
         data: profile,
         message: "user information fetched successfully"
      }
   }
   else
   return {
      status:false,
      statuscode: constants.statuscodes.notFound,
      message: "User not found"
   }

}