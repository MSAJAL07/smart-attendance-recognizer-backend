const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const adminController = require('../controllers/admin-controller');
const authController = require('../controllers/AuthController');
const classController = require('../controllers/class-controller');
const attendanceController = require('../controllers/attendance-controller');
const upload = require('../controllers/uploadController');
const constants = require('../constants/constants');

router.get('/', (req, res) => {
      res.send("{message:'Welcome to my site'}");
});

/*********************user controller*****************************/
router.post('/college-registration', adminController.adminRegistration);
router.post('/login', userController.login);
router.get('/collectImg', adminController.collectImg);
router.get('/trainData', adminController.trainData);
router.get('/takeatten', adminController.takeatten);

router.use(authController.authorizeToken);  /*AUTHORIZATION TOKEN VERIFICATION */

router.get('/user-profile', userController.getUserProfile);
/**********************admin controller *************************/
router.post('/student-registration', authController.restrictTo(constants.roles.admin), adminController.studentRegistration);
router.post('/teacher-registration', authController.restrictTo(constants.roles.admin), adminController.teacherRegistration);
router.get('/get-all-students', authController.restrictTo(constants.roles.teacher, constants.roles.admin), adminController.getAllCollegeStudents);


/**********************class controller *************************/
router.post('/classes/create-class', classController.crerateClass);
router.put('/classes/:id/add-students', authController.restrictTo(constants.roles.teacher, constants.roles.admin), classController.addStudents);
router.get('/classes/get-classes', classController.getClasses);
router.get('/classes/:class_id/get-students', classController.getStudents);

/**********************attendance controller ********************/
router.post('/upload-student-images/:user_id', upload.array("studentImages"), attendanceController.processImages);
router.get('/get-attendance', attendanceController.getAllAttendance)

module.exports = router;