const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
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
    Paragraph.findOne()
             .then( p => {
                res.render('main/read-app', {
                    p: p
                })
             })
             .catch( err => {
                 console.log(err);
             })
}
exports.calcTestResult = (req, res, next) => {
    const readSpeed = req.body.readSpeed;
    console.log( req.body)
    // Paragraph.findOne()
    //          .then(p=> {
    //              console.log(p.quizs);
    //              const answers = [];
    //              p.quizs.forEach( q => {
    //                  const id  = q._id;
    //                  answers.push(req.body.id)
    //              })
    //              console.log(answers);
    //          })
    //          .catch( err => {
    //              console.log(err);
    //          })
}