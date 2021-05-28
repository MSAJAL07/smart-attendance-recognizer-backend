const AppError=require('../config/error');
const response=require('./ResponseController');
var spawn = require("child_process").spawn;


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


module.exports.collectImg= (req,res)=>{
let runPy = new Promise(function(success, nosuccess) {
   console.log("dataaaaaaaaaaaaa111111");
    const pyprog = spawn('python3',['./faceRecognizer/collectImg.py'] );
 
    pyprog.stdout.on('data', function(data) {
       console.log("dataaaaaaaaaaaaa222222222222")
 
        success(data);
    });
 
    pyprog.stderr.on('data', (data) => {
       console.log("dataaaaaaaaaaaaa33333333333", data.toString())
        nosuccess(data);
    });
 });

console.log("dataaaaaaaaaaaaa")

runPy.then(function(fromRunpy) {
   res.write('welcome\n');
   console.log(fromRunpy.toString());
   res.end(fromRunpy);
});

}



module.exports.trainData= (req,res)=>{
   let runPy = new Promise(function(success, nosuccess) {
      console.log("dataaaaaaaaaaaaa111111");
       const pyprog = spawn('python3',['./faceRecognizer/trainData.py'] );
    
       pyprog.stdout.on('data', function(data) {
          console.log("dataaaaaaaaaaaaa222222222222")
    
           success(data);
       });
    
       pyprog.stderr.on('data', (data) => {
          console.log("dataaaaaaaaaaaaa33333333333", data.toString())
           nosuccess(data);
       });
    });
   
   console.log("dataaaaaaaaaaaaa")
   
   runPy.then(function(fromRunpy) {
      res.write('welcome\n');
      console.log(fromRunpy.toString());
      res.end(fromRunpy);
   });
   
   }




   module.exports.takeatten= (req,res)=>{
      let runPy = new Promise(function(success, nosuccess) {
         console.log("dataaaaaaaaaaaaa111111");
          const pyprog = spawn('python3',['./faceRecognizer/takeatten.py'] );
       
          pyprog.stdout.on('data', function(data) {
             console.log("dataaaaaaaaaaaaa222222222222")
       
              success(data);
          });
       
          pyprog.stderr.on('data', (data) => {
             console.log("dataaaaaaaaaaaaa33333333333", data.toString())
              nosuccess(data);
          });
       });
      
      console.log("dataaaaaaaaaaaaa")
      
      runPy.then(function(fromRunpy) {
         res.write('welcome\n');
         console.log(fromRunpy.toString());
         res.end(fromRunpy);
      });
      
      }

