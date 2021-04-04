const express=require('express');
const router=express.Router();

const userController=require('../controllers/user-controller');
const adminController=require('../controllers/admin-controller');
const authController=require('../controllers/AuthController');
const classController=require('../controllers/class-controller');
const constants = require('../constants/constants');

router.get('/',(req,res)=>{
      res.send("{message:'Welcome to my site'}");
});


router.post('/college-registration',adminController.adminRegistration);
router.post('/login',userController.login);

router.use(authController.authorizeToken);  /*AUTHORIZATION TOKEN VERIFICATION */
/**********************admin controller *************************/
router.post('/student-registration',authController.restrictTo(constants.roles.admin),adminController.studentRegistration);
router.post('/teacher-registration',authController.restrictTo(constants.roles.admin),adminController.teacherRegistration);

/**********************class controller *************************/
router.post('/create-class',authController.restrictTo(constants.roles.teacher,constants.roles.admin),classController.crerateClass);

module.exports=router;