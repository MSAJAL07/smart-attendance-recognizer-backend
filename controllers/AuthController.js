const AppError = require('../config/error');
const authService=require('../services/auth-service');
const constants=require('../constants/constants');


module.exports.authorizeToken=async (req,res,next)=>{
   const authHeader=req.headers['authorization'];
   const token=authHeader &&  authHeader.split(' ')[1];
   if(token==null)
   {
      return next(new AppError("Token is invalid or expired",constants.statuscodes.unauthorized));
   }

   var result=authService.verifyToken(token);
   if(result.status==true)
   {
      req.user=user;
      next();
   }
   else{
      return next(new AppError(result.message,result.statuscode));
   }


}