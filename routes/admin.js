const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');
const auth = require('../auth/basicAuth');
//index page
router.get('/', auth, adminControllers.getIndex);
router.post('/edit-main-page', auth, adminControllers.EditMainPage);

// read app
router.get('/read-app', auth,  adminControllers.getReadApp);
router.post('/add-paragraph', auth,  adminControllers.postAddParagraph);
router.post('/delete-prag/:pId', auth,  adminControllers.DeleteParagraph);
router.get('/edit-prag/:pId', auth,  adminControllers.EditParagraph);
router.post('/edit-paragraph/:pId', auth,  adminControllers.postEditParagraph);
// mix 
router.get('/mix', auth,  adminControllers.getMix);
router.post('/add-mix', auth,  adminControllers.postAddMix);
router.get('/edit-post/:postId', auth,  adminControllers.getEditPost);
router.post('/edit-post/:postId', auth,  adminControllers.postEditPost);
router.post('/delete-post/:postId', auth,  adminControllers.deletePost);
//export module
module.exports = router;