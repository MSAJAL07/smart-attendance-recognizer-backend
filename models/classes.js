const { date } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const classesSchema=new Schema({
   name:{
      type:String
   },
   subject_name:{
      type:String,
   },
   time_slots:[{
      day:{
         type:Array,
         enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
      },
      time_duration:{
         type:[String]
      }
   }],
   days:
   {
      type:[String],
      enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
   },
   create_date:{
      type:Date
   },
   teacher_id:{
      type:Schema.Types.ObjectId,
      ref:"teachers"
   },
   org_id:{
      type:Schema.Types.ObjectId,
      ref:"organizations"
   },
   students:{
      type:[Schema.Types.ObjectId],
      ref:"students"
   },
   class_picture:{
      type:String
   },
   attendance:[{
      date:Date,
      time_slot:[String],
      students:{
         type:[Schema.Types.ObjectId],
         ref:"students"
      },
      count:Number
   }]

});

module.exports=mongoose.model("classes",classesSchema);