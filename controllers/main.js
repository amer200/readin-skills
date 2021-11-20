const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const User = require('../modells/user');
const Blog = require('../modells/blog');
const mongoose = require('mongoose');

exports.getIndex = (req, res, next) => {
    res.render('main/index');
}
exports.getBrief = (req, res, next) => {
    MainPage.findOne()
        .then(p => {
            res.render('main/brief', {
                b: p.brief
            })
        })
}
exports.getAbout = (req, res, next) => {
    MainPage.findOne()
        .then(p => {
            res.render('main/about', {
                b: p.about
            })
        })
}
exports.getReadApp = (req, res, next) => {
    Paragraph.find({}, 'title')
        .then(t => {
            res.render('main/read-app', {
                t: t
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getTestRead = (req, res, next) => {
    const pId = req.params.pId;

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    Paragraph.findById(pId)
        .then(p => {
            const ques = [];
            const allAnswers = [];
            p.quizs.forEach(q => {
                ques.push(q.quiz);
                const answers = [q.rightanswer, q.wrongAnswerone, q.wrongAnswertwo];
                allAnswers.push(shuffle(answers));
            })
            const data = {
                id: p._id,
                title: p.title,
                content: p.content,
                wordcount: p.wordcount,
                ques: ques,
                answers: allAnswers
            }
            res.render('main/read-app-test', {
                data: data
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.calcTestResult = (req, res, next) => {
    const speed = req.body.speed;
    const lessonId = req.params.lessonId;
    const userId = req.session.user._id;
    // calc grade 
    Paragraph.findById(lessonId)
        .then(p => {
            const trueGrades = [];
            for (let i = 0; i < p.quizs.length; i++) {
                const userAnswer = req.body[p.quizs[i].quiz];
                if (userAnswer == p.quizs[i].rightanswer) {
                    trueGrades.push('1');
                }
            }
            const grade = Math.round((trueGrades.length * 100) / p.quizs.length);
            User.findById(userId)
                .then(u => {
                    const uResult = {
                        lesson: p.title,
                        speed: speed,
                        grade: grade
                    };
                    u.test.push(uResult);
                    u.save()
                })
            return grade
        })
        .then(grade => {
            res.render('main/read-test-result', {
                grade: grade,
                speed: speed
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getTestResult = (req, res, next) => {
    res.redirect('/read-app');
}
// light speed
exports.lightSpeed = (req, res, next) => {
    Paragraph.find()
        .then(t => {
            res.render('main/light-speed', {
                t: t
            })
        })
        .catch(err => {
            console.log(err)
        })
}
// mix 
exports.getMix = (req, res, next) => {
    Blog.find()
        .then(blogs => {
            if (blogs[0]) {
                res.render('main/mix', {
                    blogs: blogs
                })
            } else {
                res.render('main/mix', {
                    blogs: null
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Blog.findById(postId)
        .then(post => {
            res.render('main/post', {
                post: post
            })
        })
        .catch(err => {
            console.log(err);
        })
}