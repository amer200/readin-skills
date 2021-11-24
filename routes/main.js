const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/main');
//index page
router.get('/', mainControllers.getIndex);
router.get('/brief', mainControllers.getBrief);
router.get('/about', mainControllers.getAbout);
// read app
router.get('/read-app', mainControllers.getReadApp);
router.get('/tes-read/:pId', mainControllers.getTestRead);
router.post('/test-result/:lessonId', mainControllers.calcTestResult);
router.get('/test-result', mainControllers.getTestResult);
// light speed
router.get('/light-speed', mainControllers.lightSpeed);
router.post('/ligth-test', mainControllers.getLightTest);
// mix
router.get('/mix', mainControllers.getMix);
router.get('/post/:postId', mainControllers.getPost);
// student
router.get('/user/:uId', mainControllers.getStudent);
//contact
router.get('/contact', mainControllers.getContact);
router.post('/send-mail', mainControllers.postContact);
//export module
module.exports = router;