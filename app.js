const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session')
const app = express();
const port = process.env.PORT || 3000;
const User = require('./modells/user'); //tempr
//config session
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));
app.use( (req, res, next)=>{
    const user = req. session.user;
    res.locals = {
        user: user
    }
    next();
})
app.use('/logout', (req, res, next) => {
    req.session.destroy()
    res.redirect('/');
})
// config body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')))
// config ejs
app.set('view engine', 'ejs');

// routes
const mainRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/', mainRoutes);
app.use('/test-result/619660c6443fe7b1076f6b94', (req, res, next)=>{
    res.render('main/read-test-result');
})
app.listen(port, () => {
    console.log(`Elearning app listening at http://localhost:${port}`);
    mongoose.connect('mongodb+srv://drhasan:753698@cluster0.utxxi.mongodb.net/speedreading')
        .then(result => {
            console.log('conectet to database');
            User.findOne()
                .then( user => {
                    if(!user){
                        const user = new User({
                            name: "amer",
                            password: "123",
                            role: 'admin'
                        });
                        return user.save()
                    }else{
                        return user
                    }
                })
                .then(result => {
                    console.log('user is ok');
                })
        })
        .catch(err => {
            console.log(err);
        })
})