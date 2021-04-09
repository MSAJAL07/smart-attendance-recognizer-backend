const AppError=require('../config/error');
const response=require('./ResponseController');

const userModel=require('../models/users');
const adminValidation=require('../validations/admin-validation');
const adminService=require('../services/admin-service');
const constants = require('../constants/constants');


module.exports.adminRegistration=async (req,res,next)=>{
    try{
         await adminValidation.adminRegistrationValidation(req.body);
         var result=await adminService.adminRegistration(req.body);

         if(result.status)
         {
            return response(req,res,result.message,result.data,constants.statuscodes.success);
         }
         else{
            return next(new AppError(result.message,result.statuscode));
         }

    }catch(error)
    {
      return next(error);
    }
}

module.exports.studentRegistration=async (req,res,next)=>{
   try{
        await adminValidation.studentRegistrationValidation(req.body);
        var result=await adminService.studentRegistration(req.body,req.user);

        if(result.status)
        {
           return response(req,res,result.message,result.data,constants.statuscodes.success);
        }
        else{
           return next(new AppError(result.message,result.statuscode));
        }

   }catch(error)
   {
     return next(error);
   }
}

module.exports.teacherRegistration=async (req,res,next)=>{
   try{
        await adminValidation.teacherRegistrationValidation(req.body);
        var result=await adminService.teacherRegistration(req.body,req.user);

        if(result.status)
        {
           return response(req,res,result.message,result.data,constants.statuscodes.success);
        }
        else{
           return next(new AppError(result.message,result.statuscode));
        }

   }catch(error)
   {
     return next(error);
   }
}


module.exports.getAllCollegeStudents=async (req,res,next)=>{
   try{        
        var result=await adminService.getAllCollegeStudents(req.user);

        if(result.status)
        {
           return response(req,res,result.message,result.data,constants.statuscodes.success);
        }
        else{
           return next(new AppError(result.message,result.statuscode));
        }

   }catch(error)
   {
     return next(error);
   }
}