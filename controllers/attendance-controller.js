const AppError=require('../config/error');
const response=require('../controllers/ResponseController')
const attendanceService=require('../services/attendance-service')
const constants=require('../constants/constants')

module.exports.processImages=async (req,res,next)=>{
   try{
      console.log(req.parans)
        var result=await attendanceService.processImages(req.body,req.files);

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
