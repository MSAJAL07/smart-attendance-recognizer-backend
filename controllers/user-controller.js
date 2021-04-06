const response=require('../controllers/ResponseController');
const constants=require('../constants/constants');
const userSrvice=require('../services/user-service');
const AppError = require('../config/error');
module.exports.login=async (req,res,next)=>{
   try{
      var result=await userSrvice.login(req.body);
      if(result.status)
      {
         return response(req,res,result.message,result.data,constants.statuscodes.success,result.token);
      }
      else
      {
         return next(new AppError(result.message,result.statuscode));
      }
   }catch(error)
   {
      return next(error);
   }
}

module.exports.getUserProfile=async (req,res,next) =>
{
   try{
      var result=await userSrvice.getUserProfile(req.user);
      if(result.status)
      {
         return response(req,res,result.message,result.data,constants.statuscodes.success);
      }else
      {
         return next(new AppError(result.message,result.statuscode));
      }
   }catch(error)
   {
      next(error)
   }
}

