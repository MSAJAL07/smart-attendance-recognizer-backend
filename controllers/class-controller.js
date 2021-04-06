const classValidation=require('../validations/class-validation');
const classService=require('../services/class-service');
const response=require('../controllers/ResponseController');
const constants=require('../constants/constants');
const AppError=require('../config/error');
module.exports.crerateClass=async (req,res,next)=>{
   try{
      await classValidation.createClassValidation(req.body);
      var result=await classService.createClass(req.body,req.user);
      if(result.status==true)
      {
         return response(req,res,result.message,result.data,constants.statuscodes.success);
      }
      else 
      {
         next(new AppError(result.message,result.statuscode));
      }
   }catch(error)
   {
      next(error);
   }

}

module.exports.addStudents=async (req,res,next)=>{
   try{
      var result=await classService.addStudents(req.body,req.params.id,req.user);
      if(result.status==true)
      {
         return response(req,res,result.message,result.data,constants.statuscodes.success);
      }
      else 
      {
         next(new AppError(result.message,result.statuscode));
      }
   }catch(error)
   {
      next(error);
   }

}

module.exports.getClasses=async (req,res,next)=>{
   try{
      var result=await classService.getClasses(req.query,req.user);
      if(result.status==true)
      {
         return response(req,res,result.message,result.data,constants.statuscodes.success);
      }
      else 
      {
         next(new AppError(result.message,result.statuscode));
      }
   }catch(error)
   {
      next(error);
   }

}