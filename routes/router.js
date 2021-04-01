const express=require('express');
const router=express.Router();

const userController=require('../controllers/user-controller');
const adminController=require('../controllers/admin-controller');
const authController=require('../controllers/AuthController');

router.get('/',(req,res)=>{
      res.send("{message:'Welcome to my site'}");
});


router.post('/admin-registration',adminController.adminRegistration);
router.post('/login',userController.login);

router.use(authController.authorizeToken);  /*AUTHORIZATION TOKEN VERIFICATION */





module.exports=router;