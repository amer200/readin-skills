const MainPage = require('../modells/main-page');
const mongoose = require('mongoose');


exports.getIndex = (req, res, next) => {
    MainPage.findOne()
        .then(result => {
            res.render('admin/index',{
                MainPageData: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.EditMainPage = (req, res, next) => {
    const brief = req.body.brief;
    const about = req.body.about;
    const mainpage = new MainPage({
        about: about,
        brief: brief
    });
    mainpage.save()
            .then( result => {
                res.redirect('/admin/')
            })
            .catch( err =>{
                console.log(err)
            })
}
//// edit it to make update and add new