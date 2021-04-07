const classModel=require('../models/classes');
const studentModel=require('../models/students');
const teacherModel=require('../models/teachers');
const constants=require('../constants/constants');
var ObjectId = require('mongodb').ObjectID;


module.exports.createClass=async (data,user)=>{
   var classObject=data;
   classObject.teacher_id=user.id;
   classObject.org_id=user.org_id;
   classObject.create_date=new Date();
   var className=await classModel.create(classObject);
   await teacherModel.findOneAndUpdate({user_id:user.id},{$push:{classes:className._id}});
   return {
      status:true,
      message:"Class created successfully",
      data:data
   }
}

module.exports.addStudents=async (data,class_id,user)=>{
   var studentsArray=data.students;
   await classModel.findOneAndUpdate({_id:class_id},{$addToSet:{
      students:{$each:studentsArray}
   }});
   studentsArray.forEach(async (student_id) => {
      await studentModel.findOneAndUpdate({user_id:student_id},{$addToSet:{
         classes:class_id
      }});      
   });

   return {
      status: true,
      message:"Students added successfully",
      data:""
   }
}

module.exports.getClasses=async (query,user)=>{
   var classes=[];
   var user_type;
   var user_id;
   if(query.user_id && query.user_type)
   {
      user_id=query.user_id;
      user_type=query.user_type;
   }
   else
   {
      user_id= user.id;
      user_type=user.user_type;
   }

   if(user_type==constants.roles.teacher)
      {
         console.log(user);
         classes=await teacherModel.aggregate([
            {$match: {user_id:ObjectId(user_id)}},
            {
               $unwind: "$classes"
            },
            {
               $lookup:{
                  from: "classes",
                  localField: "classes",
                  foreignField:"_id",
                  as: "classObject"
               }
            },
            {
               $unwind: "$classObject"
            },
            {
               $project:{
                  "class_id":"$classObject._id",
                  "name":"$classObject.name",
                  "subject_name": "$classObject.subject_name",
                  "class_time":"$classObject.class_time",
                  "create_date":"$clasObject.create_date",
                  "class_picture":"$class_picture",
                  "teacher_name":"$name",
                  "email_id":"$email_id"
               }
            } 
         ]);

         return {
            status: true,
            data: classes,
            message:"List of classes successfully fetched"
         }
      }

   if(user_type==constants.roles.student)
   {
      classes=await studentModel.aggregate([
         {$match: {user_id:ObjectId(user_id)}},
         {
            $unwind: "$classes"
         },
         {
            $lookup:{
               from: "classes",
               localField: "classes",
               foreignField:"_id",
               as: "classObject"
            }
         },
         {
            $unwind: "$classObject"
         },
         {
            $project:{
               "class_id":"$classObject._id",
               "name":"$classObject.name",
               "subject_name": "$classObject.subject_name",
               "class_time":"$classObject.class_time",
               "create_date":"$clasObject.create_date",
               "class_picture":"$class_picture",
               "teacher_name":"$name",
               "email_id":"$email_id"
            }
         }
      ]);

      return {
         status: true,
         data: classes,
         message:"List of classes successfully fetched"
      }
   }

   return {
      status: false,
      statuscode: constants.statuscodes.notFound,
      message: "No classes found"
   }

}