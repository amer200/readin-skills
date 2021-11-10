const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');
//index page
router.get('/', adminControllers.getIndex);
router.post('/edit-main-page', adminControllers.EditMainPage);

// read app
router.get('/read-app', adminControllers.getReadApp);
router.post('/add-paragraph', adminControllers.postAddParagraph);
//export module
module.exports = router;