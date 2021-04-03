const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');

const teachersSchema=new Schema({
   teacher_id:{
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
      type:String,
      unique: true
   },
   gender:
   {
      type:String,
      enum:['M','F']
   },
   faculty_id:{
      type:String
   },
   address:{
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

teachersSchema.plugin(uniqueValidator,{
   message: 'Error: expected {PATH} to be unique.',
})


const teachers=mongoose.model("teachers",teachersSchema);
module.exports=teachers;