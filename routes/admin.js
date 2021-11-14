const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');
//index page
router.get('/', adminControllers.getIndex);
router.post('/edit-main-page', adminControllers.EditMainPage);

// read app
router.get('/read-app', adminControllers.getReadApp);
router.post('/add-paragraph', adminControllers.postAddParagraph);
router.post('/delete-prag/:pId', adminControllers.DeleteParagraph);
router.get('/edit-prag/:pId', adminControllers.EditParagraph);
router.post('/edit-paragraph/:pId', adminControllers.postEditParagraph);
// mix 
router.get('/mix', adminControllers.getMix);
router.post('/add-mix', adminControllers.postAddMix);
router.get('/edit-post/:postId', adminControllers.getEditPost);
//export module
module.exports = router;