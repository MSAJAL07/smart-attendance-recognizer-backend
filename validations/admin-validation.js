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