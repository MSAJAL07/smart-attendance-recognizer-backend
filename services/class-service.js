const classModel=require('../models/classes');
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