const classValidation=require('../validations/class-validation');
const classService=require('../services/class-service');
const response=require('../controllers/ResponseController');
const constants=require('../constants/constants');
const AppError=require('../config/error');
module.exports.crerateClass=async (req,res,next)=>{
   try{
      await classValidation.crerateClassValidation(req.body);
      var result=await classService.crerateClass(req.body,req.user);
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