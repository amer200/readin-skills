const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');
const auth = require('../auth/basicAuth');
//index page
router.get('/', auth, adminControllers.getIndex);
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
router.post('/edit-post/:postId', adminControllers.postEditPost);
router.post('/delete-post/:postId', adminControllers.deletePost);
//export module
module.exports = router;