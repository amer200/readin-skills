const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/main');
//index page
router.get('/', mainControllers.getIndex);

// read app
router.get('/read-app', mainControllers.getReadApp);
router.post('/test-result', mainControllers.calcTestResult);
router.get('/test-result', mainControllers.getTestResult);
// light speed
router.get('/light-speed', mainControllers.lightSpeed);

//export module
module.exports = router;