const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/main');
//index page
router.get('/', mainControllers.getIndex);

//export module
module.exports = router;