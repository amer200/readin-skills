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
    MainPage.findOne()
            .then( page => {
                if(!page){
                    return mainpage.save().then(result => {res.redirect('/admin/')})
                }else{
                    page.about = about;
                    page.brief = brief;
                    page.save()
                        .then( result => {
                            res.redirect('/admin/')
                        })
                }
            })
            .catch(err => {
                console.log(err);
            })
}