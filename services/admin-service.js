const bcrypt=require('bcrypt');
const constants=require('../constants/constants');
const userModel=require('../models/users');
const  organizationModel=require('../models/organizations');

module.exports.adminRegistration=async (body)=>{
      var user=await userModel.findOne({email_id:body.email_id,user_type:constants.roles.admin});
      if(user)
      {
         return {
            status: false,
            statuscode:constants.statuscodes.conflict,
            message: "This email ID already has an admin account"
         }
      }
      user=await userModel.findOne({username:body.username});
      if(user)
      {
         return {
            status: false,
            statuscode:constants.statuscodes.conflict,
            message: "This username already exists"
         }
      }
   
      if(body.password!=body.confirm_password)
      {
         return {
            status: false,
            statuscode:constants.statuscodes.invalid,
            message: "password does not match"
         }
      }
   
      var orgObject={
         name:body.org_name,
         address:body.org_address,
         establishment_year: body.establishment_year
      }
      const org=await organizationModel.create(orgObject);

      //const salt=await bcrypt.genSalt();  //default arg is 10


      const hashedPassword=await bcrypt.hash(body.password,10);

      var userObject={
         username:body.username,
         email_id:body.email_id,
         user_type:constants.roles.admin,
         password:hashedPassword,
         org_id: org._id
      }
      user=await userModel.create(userObject);

      return{
         status:true,
         data:org._id,
         message: "Admin created successfully"
      }
   
   

}
