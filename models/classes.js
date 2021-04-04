const { date, string } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const classesSchema=new Schema({
   name:{
      type:String
   },
   subject_name:{
      type:String,
   },
   class_time:[{
      day:{
         type:String,
         enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
      },
      time_slots:[{
         start_time: String,
         end_time: String
      }]
   }],
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

const classes=mongoose.model("classes",classesSchema);
module.exports=classes;