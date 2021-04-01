const jwt=require('jsonwebtoken');
const constants=require('../constants/constants');

module.exports.generateToken=async (user,expiresIn)=>
{
   const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:expiresIn || 7*24*60*60});
   return accessToken;
}

module.exports.verifyToken=async (token)=>{
   var response;
   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
      if(err) response={
         status: false,
         statuscode:constants.statuscodes.unauthorized,
         message: "Invalid token"
      };
      else  response={
         status: false,
         data:user
      }
   });
   return response;
}