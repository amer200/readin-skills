const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router();


router.get('/auth', auth.getLogin);
router.post('/login', auth.postLogin);

router.get('/signup', auth.getSignup);
router.post('/signup', auth.postSignup);

module.exports = router;