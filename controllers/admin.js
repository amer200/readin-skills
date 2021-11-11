const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const mongoose = require('mongoose');


exports.getIndex = (req, res, next) => {
    MainPage.findOne()
        .then(result => {
            res.render('admin/index', {
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
        .then(page => {
            if (!page) {
                return mainpage.save().then(result => {
                    res.redirect('/admin/')
                })
            } else {
                page.about = about;
                page.brief = brief;
                page.save()
                    .then(result => {
                        res.redirect('/admin/')
                    })
            }
        })
        .catch(err => {
            console.log(err);
        })
}


// read app

exports.getReadApp = (req, res, next) => {
    Paragraph.find()
        .then(prags => {
            res.render('admin/read-app', {
                prags: prags
            });
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postAddParagraph = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const wordcount = req.body.wordCount;
    const quizs = req.body.quiz;
    const rightAnswers = req.body.rightAnswer;
    const wronganswerone = req.body.wrongAnswerone;
    const wronganswertwo = req.body.wrongAnswertwo;

    if (typeof quizs == 'string') {
        const quiz = {
            quiz: quizs,
            rightanswer: rightAnswers,
            wrongAnswerone: wronganswerone,
            wrongAnswertwo: wronganswertwo
        };
        const paragraph = new Paragraph({
            title: title,
            content: content,
            wordcount: wordcount,
            quizs: quiz
        })
        paragraph.save()
            .then(result => {
                res.redirect('/admin/read-app');
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        const quizlist = [];
        for (let i = 0; i < quizs.length; i++) {
            const quiz = {
                quiz: quizs[i],
                rightanswer: rightAnswers[i],
                wrongAnswerone: wronganswerone[i],
                wrongAnswertwo: wronganswertwo[i]
            };
            quizlist.push(quiz)
        }
        const paragraph = new Paragraph({
            title: title,
            content: content,
            wordcount: wordcount,
            quizs: quizlist
        })
        paragraph.save()
            .then(result => {
                res.redirect('/admin/read-app');
            })
            .catch(err => {
                console.log(err);
            })
    }
}
exports.DeleteParagraph = (req, res, next) => {
    const pId = req.params.pId;
    Paragraph.findOneAndRemove({
            _id: pId
        })
        .then(result => {
            res.redirect('/admin/read-app');
        })
        .catch(err => {
            console.log(err);
        })
}
exports.EditParagraph = (req, res, next) => {
    const pId = req.params.pId;
    Paragraph.findOne({
            _id: pId
        })
        .then(p => {
            res.render('admin/edit-read', {
                p: p
            });
        })
}
exports.postEditParagraph = (req, res, next) => {
    const pId = req.params.pId;
    const title = req.body.title;
    const content = req.body.content;
    const wordcount = req.body.wordCount;
    Paragraph.findOne({
            _id: pId
        })
        .then(p => {
            p.title = title;
            p.content = content;
            p.wordcount = wordcount;
            return p.save()
        })
        .then(result => {
            res.redirect('/admin/read-app');
        })
        .catch(err => {
            console.log(err);
        })
}