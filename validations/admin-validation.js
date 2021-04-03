const Joi=require('@hapi/joi');
const regex=require('../constants/regex');
module.exports.adminRegistrationValidation=async (data)=>{
   const adminValidationSchema=Joi.object().keys({
      email_id:Joi.string().email().required(),
      username:Joi.string().regex(regex.usernameRegex).required(),
      password:Joi.string().regex(regex.passwordRegex).required(),
      confirm_password:Joi.string().regex(regex.passwordRegex).required(),
      org_name:Joi.string().required(),
      org_address:Joi.string().required(),
      establishment_year:Joi.number().required()
   });
   return await adminValidationSchema.validate(data);
}

module.exports.studentRegistrationValidation=async (data)=>{
   const studentValidationSchema=Joi.object().keys({
      name:Joi.string().regex(regex.nameRegex).required(),
      phone_number:Joi.string().regex(regex.phoneRegex).required(),
      email_id:Joi.string().email().required(),
      gender: Joi.string().valid('M','F').required(),
      enrollment_number: Joi.string(),
      address: Joi.string().required(),
      year:Joi.string().required(),
      branch:Joi.string().required(),
      date_of_birth:Joi.date().required()
   });
   return await studentValidationSchema.validate(data);
} 