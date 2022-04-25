const classModel = require('../models/classes');
const studentModel = require('../models/students');
const teacherModel = require('../models/teachers');
const constants = require('../constants/constants');
var ObjectId = require('mongodb').ObjectID;


module.exports.createClass = async (data, user) => {
   var classObject = data;
   console.log("Class", data);
   classObject.teacher_id = user.id;
   classObject.org_id = user.org_id;
   classObject.create_date = new Date();
   var className = await classModel.create(classObject);
   await teacherModel.findOneAndUpdate({ user_id: user.id }, { $push: { classes: className._id } });
   return {
      status: true,
      message: "Class created successfully",
      data: data
   }
}

module.exports.addStudents = async (data, class_id, user) => {
   var studentsArray = data.students;
   await classModel.findOneAndUpdate({ _id: class_id }, {
      $addToSet: {
         students: { $each: studentsArray }
      }
   });
   studentsArray.forEach(async (student_id) => {
      await studentModel.findOneAndUpdate({ user_id: student_id }, {
         $addToSet: {
            classes: class_id
         }
      });
   });

   return {
      status: true,
      message: "Students added successfully",
      data: ""
   }
}

module.exports.getClasses = async (query, user) => {
   var classes = [];
   var user_type;
   var user_id;
   if (query.user_id && query.user_type) {
      user_id = query.user_id;
      user_type = query.user_type;
   }
   else {
      user_id = user.id;
      user_type = user.user_type;
   }

   if (user_type == constants.roles.teacher) {
      console.log(user);
      classes = await teacherModel.aggregate([
         { $match: { user_id: ObjectId(user_id) } },
         {
            $unwind: "$classes"
         },
         {
            $lookup: {
               from: "classes",
               localField: "classes",
               foreignField: "_id",
               as: "classObject"
            }
         },
         {
            $unwind: "$classObject"
         },
         {
            $project: {
               "class_id": "$classObject._id",
               "name": "$classObject.name",
               "subject_name": "$classObject.subject_name",
               "class_time": "$classObject.class_time",
               "create_date": "$clasObject.create_date",
               "class_picture": "$class_picture",
               "teacher_name": "$name",
               "email_id": "$email_id"
            }
         }
      ]);

      return {
         status: true,
         data: classes,
         message: "List of classes successfully fetched"
      }
   }

   if (user_type == constants.roles.student) {
      classes = await studentModel.aggregate([
         { $match: { user_id: ObjectId(user_id) } },
         {
            $unwind: "$classes"
         },
         {
            $lookup: {
               from: "classes",
               localField: "classes",
               foreignField: "_id",
               as: "classObject"
            }
         },
         {
            $unwind: "$classObject"
         },
         {
            $project: {
               "class_id": "$classObject._id",
               "name": "$classObject.name",
               "subject_name": "$classObject.subject_name",
               "class_time": "$classObject.class_time",
               "create_date": "$clasObject.create_date",
               "class_picture": "$class_picture",
               "teacher_name": "$name",
               "email_id": "$email_id"
            }
         }
      ]);

      return {
         status: true,
         data: classes,
         message: "List of classes successfully fetched"
      }
   }

   return {
      status: false,
      statuscode: constants.statuscodes.notFound,
      message: "No classes found"
   }

}


module.exports.getStudents = async (data) => {
   console.log(data);
   var class_id = ObjectId(data.class_id);
   var students = await classModel.aggregate([
      {
         $match: {
            _id: class_id
         }
      },
      {
         $unwind: "$students"
      },
      {
         $lookup: {
            from: "students",
            localField: "students",
            foreignField: "user_id",
            as: "studentObject"
         }
      }, {
         $unwind: "$studentObject"
      },
      {
         $project: {
            class_id: "$_id",
            class_name: "$name",
            subject_name: "$subject_name",
            "user_id": "$studentObject.user_id",
            "student_name": "$studentObject.name",
            "phone_number": "$studentObject.phone_number",
            "email_id": "$studentObject.email_id",
            "gender": "$studentObject.gender",
            "enrollment_number": "$studentObject.enrollment_number",
            "address": "$studentObject.address",
            "year": "$studentObject.year",
            "branch": "$studentObject.branch",
            "date_of_birth": "$studentObject.date_of_birth",

         }
      }
   ]);

   return {
      status: true,
      data: students,
      message: "Students list fetched successfully"
   }
}