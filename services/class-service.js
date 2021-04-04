const classModel=require('../models/classes');
const studentModel=require('../models/students');
const constants=require('../constants/constants');



module.exports.createClass=async (data,user)=>{
   var classObject=data;
   classObject.teacher_id=user.id;
   classObject.org_id=user.org_id;
   classObject.create_date=new Date();
   await classModel.create(classObject);
   return {
      status:true,
      message:"Class created successfully",
      data:data
   }
}

module.exports.addStudents=async (data,class_id,user)=>{
   console.log(data);
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