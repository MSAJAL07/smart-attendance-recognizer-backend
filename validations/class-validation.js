const Joi=require('@hapi/joi');
const regex=require('../constants/regex');

module.exports.createClassValidation=async (data)=>{
   const classTimeSchema={
      day: Joi.string().valid('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday').required(),
      time_slots: Joi.array().min(1).items(Joi.object({start_time:Joi.string().required(),end_time:Joi.string().required()})).required()
   };
   const classValidation=Joi.object().keys({
      name:Joi.string().required(),
      subject_name:Joi.string().required(),
      class_time:Joi.array().min(1).items(Joi.object(classTimeSchema)).required(),
   });
   return await classValidation.validate(data);
}