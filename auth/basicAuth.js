const adminControllers = require('../controllers/admin');
module.exports = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/auth');
    }else if(req.session.user.role == 'admin'){
        return next()
    }else if(req.session.user.role == 'basic'){
        return res.redirect('/');
    }
    next()
}