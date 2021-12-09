const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');
const auth = require('../auth/basicAuth');
//index page
router.get('/', auth, adminControllers.getIndex);
router.post('/brief', auth, adminControllers.brief);
router.post('/about', auth, adminControllers.about);
// read app
router.get('/read-app', auth,  adminControllers.getReadApp);
router.post('/add-paragraph', auth,  adminControllers.postAddParagraph);
router.post('/delete-prag/:pId', auth,  adminControllers.DeleteParagraph);
router.get('/edit-prag/:pId', auth,  adminControllers.EditParagraph);
router.post('/edit-paragraph/:pId', auth,  adminControllers.postEditParagraph);
router.post('/sortP', auth, adminControllers.sortP);
router.post('/hideL/:pId', auth, adminControllers.hideParag);
// mix 
router.post('/add-mix', auth,  adminControllers.postAddMix);
router.get('/edit-post/:postId', auth,  adminControllers.getEditPost);
router.post('/edit-post/:postId', auth,  adminControllers.postEditPost);
router.post('/delete-post/:postId', auth,  adminControllers.deletePost);
// student
router.get('/user/:uId', auth, adminControllers.getStudent),
router.post('/edit-user/:uId', auth, adminControllers.postEdituser);
router.post('/remove-user/:uId', auth, adminControllers.removeUser);
router.post('/add-user', auth, adminControllers.addUser);
router.post('/remove-lesson/:uId', auth, adminControllers.removeLesson);
// rules 
router.post('/readRule', auth, adminControllers.readRule);
//export module
module.exports = router;