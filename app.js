const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

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
app.use('/admin', adminRoutes);
app.use('/', mainRoutes);
app.listen(port, () => {
    console.log(`Elearning app listening at http://localhost:${port}`)
    mongoose.connect('mongodb+srv://drhasan:753698@cluster0.utxxi.mongodb.net/speedreading')
        .then(result => {
            console.log('conectet to database')
        })
        .catch(err => {
            console.log(err);
        })
})
// RU}R2m=r];b! key