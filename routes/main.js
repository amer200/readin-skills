const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/main');
//index page
router.get('/', mainControllers.getIndex);
router.get('/read-app', mainControllers.getReadApp)
router.post('/test-result', mainControllers.calcTestResult)
//export module
module.exports = router;