const express=require('express');
const router=express.Router();

const userController=require('../controllers/user-controller');
const adminController=require('../controllers/admin-controller');
const authController=require('../controllers/AuthController');
const constants = require('../constants/constants');

router.get('/',(req,res)=>{
      res.send("{message:'Welcome to my site'}");
});


router.post('/college-registration',adminController.adminRegistration);
router.post('/login',userController.login);

router.use(authController.authorizeToken);  /*AUTHORIZATION TOKEN VERIFICATION */

router.post('/student-registration',authController.restrictTo(constants.roles.admin),adminController.studentRegistration);
router.post('/teacher-registration',authController.restrictTo(constants.roles.admin),adminController.teacherRegistration);


module.exports=router;