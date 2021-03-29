const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const studentsSchema=new Schema({
   student_id:{
      type:Schema.Types.ObjectId,
      ref:"users"
   },
   name:{
      type:String
   },
   phone_number:{
      type:String,
      unique:true
   },
   email_id:{
      type:String
   },
   gender:
   {
      type:String
   },
   enrollment_number:{
      type:String
   },
   address:{
      type:String
   },
   year:{
      type:String
   },
   branch:{
      type:String
   },
   date_of_birth:{
      type:Date
   },
   classes:{
      type:[Schema.Types.ObjectId],
      ref:"classes"
   },
   org_id:{
      type:Schema.Types.ObjectId,
      ref:"organizations"
   },
   profile_picture:{
      type:String
   }

});

module.exports=mongoose.model("students",studentsSchema);