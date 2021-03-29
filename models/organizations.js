const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const organizationsSchema=new Schema({
   name:{
      type:String
   },
   address:{
      type:String
   },
   establishment_year:
   {
      type:Number
   },
   logo:{
      type:String
   }
});

module.exports=mongoose.model("organizations",organizationsSchema);