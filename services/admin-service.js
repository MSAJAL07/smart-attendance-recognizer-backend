const bcrypt=require('bcrypt');
const constants=require('../constants/constants');
const userModel=require('../models/users');
const  organizationModel=require('../models/organizations');
const studentModel=require('../models/students');
const teacherModel=require('../models/teachers');
const crypto=require('crypto');

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


module.exports.studentRegistration=async (body,user)=>
{
   
   var admin=await userModel.findById(user.id);
   var org_id= admin.org_id;
   
   var password=crypto.randomBytes(64).toString('hex').substring(0,8);
   const hashedPassword=await bcrypt.hash(password,10);
   var userStudent={
      username:body.phone_number.toString(),
      email_id:body.email_id,
      password:hashedPassword,
      user_type:constants.roles.student,
      org_id:org_id
   };
   var userCreated=await userModel.create(userStudent);

   var studentObject={
      user_id:userCreated._id,
      name:body.name,
      phone_number:body.phone_number,
      email_id:body.email_id,
      gender: body.gender,
      enrollment_number: body.enrollment_number,
      address: body.address,
      year:body.year,
      branch:body.branch,
      date_of_birth:body.date_of_birth,
      org_id:org_id
   };
   var student=await studentModel.create(studentObject);
   //send mail to student and email,username and password
   return {
      status:true,
      data:student,
      message: "Student created successfully"
   }

}


module.exports.teacherRegistration=async (body,user)=>
{
   
   var admin=await userModel.findById(user.id);
   var org_id= admin.org_id;
   
   var password=crypto.randomBytes(64).toString('hex').substring(0,8);

   console.log("username=",body.phone_number.toString());
   console.log("pasword==",password);

   const hashedPassword=await bcrypt.hash(password,10);
   var userTeacher={
      username:body.phone_number.toString(),
      email_id:body.email_id,
      password:hashedPassword,
      user_type:constants.roles.teacher,
      org_id:org_id
   };
   var userCreated=await userModel.create(userTeacher);

   var teacherObject={
      user_id:userCreated._id,
      name:body.name,
      phone_number:body.phone_number,
      email_id:body.email_id,
      gender: body.gender,
      faculty_id: body.faculty_id,
      address: body.address,
      date_of_birth:body.date_of_birth,
      org_id:org_id
   };
   var teacher=await teacherModel.create(teacherObject);
   //send mail to teacher and email,username and password
   return {
      status:true,
      data:{org_id:org_id},
      message: "Teacher profile created successfully"
   }

}