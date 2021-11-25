const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const Blog = require('../modells/blog');
const User = require('../modells/user');
const mongoose = require('mongoose');


exports.getIndex = (req, res, next) => {
    MainPage.findOne()
        .then(p => {
            return p
        })
        .then(p => {
            Blog.find()
                .then(blogs => {
                    User.find()
                        .then(users => {
                            const data = {
                                brief: p.brief,
                                about: p.about,
                                blogs: blogs,
                                users: users
                            }
                            res.render('admin/index', {
                                data: data
                            })
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.brief = (req, res, next) => {
    const content = req.body.content;
    MainPage.findOne()
        .then(p => {
            p.brief = content;
            return p.save()
        })
        .then(result => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.about = (req, res, next) => {
    const content = req.body.content;
    MainPage.findOne()
        .then(p => {
            p.about = content;
            return p.save()
        })
        .then(result => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}

// read app

exports.getReadApp = (req, res, next) => {
    Paragraph.find()
        .then(p => {
            res.render('admin/read-app', {
                p: p
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
    const quizs = req.body.qu;
    const plaintext = req.body.plaintext;
    const rightAnswers = req.body.rA;
    const wronganswerone = req.body.wAo;
    const wronganswertwo = req.body.wAt;
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
            quizs: quiz,
            plaintext: plaintext
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
            quizs: quizlist,
            plaintext: plaintext
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
    const quizs = req.body.qu;
    const rightAnswers = req.body.rA;
    const wronganswerone = req.body.wAo;
    const wronganswertwo = req.body.wAt;
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
exports.postAddMix = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const img = req.body.img;
    const blog = new Blog({
        title: title,
        content: content,
        img: img
    })
    blog.save()
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getEditPost = (req, res, next) => {
    const postId = req.params.postId;
    Blog.findById(postId)
        .then(post => {
            res.render('admin/edit-post', {
                post: post
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.postEditPost = (req, res, next) => {
    const postId = req.params.postId;
    const title = req.body.title;
    const content = req.body.content;
    const img = req.body.img;
    Blog.findById(postId)
        .then(post => {
            post.title = title;
            post.content = content;
            post.img = img;
            return post.save();
        })
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        })
}
exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Blog.findByIdAndRemove(postId)
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
// student
exports.getStudent = (req, res, next) => {
    const uId = req.params.uId;
    User.findById(uId)
        .then(u =>{
            const grades = [];
            u.test.forEach( t =>{
                let grade = +t.grade;
                grades.push(grade);
            })
            res.render('admin/user',{
                u: u,
                maxSpeed: Math.max(...grades)
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postEdituser = (req, res, next) =>{
    const name = req.body.name;
    const password = req.body.password;
    const uId = req.params.uId;
    User.findById(uId)
        .then(u =>{
            u.name = name;
            u.password = password;
            return u.save();
        })
        .then( result =>{
            res.redirect(`/admin/user/${uId}`);
        })
        .catch(err => {
            console.log(err)
        })
}