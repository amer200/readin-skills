const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const Blog = require('../modells/blog');
const mongoose = require('mongoose');

exports.getIndex = (req, res, next) => {
    MainPage.findOne()
        .then(data => {
            res.render('main/index', {
                data: data
            })
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getReadApp = (req, res, next) => {
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    Paragraph.findOne()
        .then(p => {
            const allAnswers = [];
            const ques = [];
            if (p) {
                p.quizs.forEach(q => {
                    const answer = [q.rightanswer, q.wrongAnswerone, q.wrongAnswertwo];
                    allAnswers.push(shuffle(answer));
                })
                p.quizs.forEach(q => {
                    ques.push(q.quiz)
                })
                const data = {
                    title: p.title,
                    content: p.content,
                    wordCount: p.wordcount,
                    ques: ques, // array
                    answers: allAnswers // array
                }
                res.render('main/read-app', {
                    data: data
                })
            }else{
                res.render('main/read-app', {
                    data: null
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
exports.calcTestResult = (req, res, next) => {
    const average = req.body.average;
    Paragraph.findOne()
        .then(p => {
            const trueGrades = [];
            for (let i = 0; i < p.quizs.length; i++) {
                const userAnswer = req.body[p.quizs[i].quiz];
                if (userAnswer == p.quizs[i].rightanswer) {
                    trueGrades.push('1');
                }
            }
            const grade = (trueGrades.length * 100) / p.quizs.length;
            console.log(grade);
            console.log(`معدل سرعة القراءة ${average} في الدقيقة`);
            const result = {
                read: average,
                understand: grade
            };
            res.render('main/read-app-result', {
                result: result
            })

        })
        .catch(err => {
            console.log(err)
        })
}
exports.getTestResult = (req, res, next) => {
    res.redirect('/read-app');
}
// light speed
exports.lightSpeed = (req, res, next) => {
    res.render('main/light-speed');
}
// mix 
exports.getMix = (req, res, next) => {
    Blog.find()
        .then(blogs => {
            if(blogs[0]){
                res.render('main/mix', {
                    blogs: blogs
                })
            }else{
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