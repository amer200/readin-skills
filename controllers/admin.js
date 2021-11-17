const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const Blog = require('../modells/blog');
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
exports.brief = (req, res, next) => {
    const content = req.body.content;
    MainPage.findOne()
            .then( p => {
                p.brief = content;
                return p.save()
            })
            .then(result => {
                res.redirect('/admin')
            })
            .catch( err => {
                console.log(err)
            })
}
exports.about = (req, res, next) => {
    const content = req.body.content;
    MainPage.findOne()
            .then( p => {
                p.about = content;
                return p.save()
            })
            .then(result => {
                res.redirect('/admin')
            })
            .catch( err => {
                console.log(err)
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
    const quizs = req.body.quiz;
    const rightAnswers = req.body.rightAnswer;
    const wronganswerone = req.body.wrongAnswerone;
    const wronganswertwo = req.body.wrongAnswertwo;
    Paragraph.findOne({
            _id: pId
        })
        .then(p => {
            p.title = title;
            p.content = content;
            p.wordcount = wordcount;
            if (typeof quizs == 'string') {
                const quiz = {
                    quiz: quizs,
                    rightanswer: rightAnswers,
                    wrongAnswerone: wronganswerone,
                    wrongAnswertwo: wronganswertwo
                };
                p.quizs = quiz;
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
                p.quizs = quizlist;
            }
            return p.save()
        })
        .then(result => {
            res.redirect('/admin/read-app');
        })
        .catch(err => {
            console.log(err);
        })
}
// mix 
exports.getMix = (req, res, next) => {
    Blog.find()
        .then(blogs => {
            res.render('admin/mix',{
                blogs: blogs
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postAddMix = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const textContent = req.body.textContent;
    const img = req.body.img;
    const blog = new Blog({
        title: title,
        content: content,
        text: textContent,
        img: img
    })
    blog.save()
        .then(result => {
            res.redirect('/mix');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getEditPost = (req, res, next) => {
    const postId = req.params.postId;
    Blog.findById(postId)
        .then( post => {
            res.render('admin/edit-post', {
                post: post
            })
        })
        .catch( err => {
            console.log(err);
        })
}
exports.postEditPost = (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const textContent = req.body.textContent;
    const img = req.body.img;
    Blog.findById(postId)
        .then( post => {
            post.title = title;
            post.content = content;
            post.text = textContent;
            post.img = img;
            return post.save();
        })
        .then( result => {
            res.redirect('/admin/mix');
        })
        .catch( err => {
            console.log(err);
        })
}
exports.deletePost = (req, res, next) =>{
    const postId = req.params.postId;
    Blog.findByIdAndRemove(postId)
        .then( result => {
            res.redirect('/admin/mix');
        })
        .catch(err => {
            console.log(err)
        })
}