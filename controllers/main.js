const MainPage = require('../modells/main-page');
const mongoose = require('mongoose');

exports.getIndex = (req, res, next) => {
    MainPage.findOne()
    .then(data => {
        res.render('main/index',{
            data: data
        })
    })
    .catch( err => {
        console.log(err);
    })
}
exports.getReadApp = (req, res, next) => {
    res.render('main/read-app')
}