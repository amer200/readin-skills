const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const Blog = require('../modells/blog');
const User = require('../modells/user');
const Rule = require('../modells/rule');
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
                                brief: (p) ? p.brief : 'السيرة الذاتية',
                                about: (p) ? p.about : 'عن بيئة التعلم',
                                blogs: (blogs) ? blogs : 'المقالات',
                                users: (users) ? users : 'المستخدمين'
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
    Paragraph.find().sort('so')
        .then(p => {

            Rule.findOne()
                .then(r => {
                    res.render('admin/read-app', {
                        p: p,
                        r: r
                    });
                })
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
        Paragraph.find()
            .then(p => {
                if (p) {
                    console.log(p)
                    return sortNum = +p.length + 1
                } else {
                    return sortNum = 1
                }
            })
            .then(sortNum => {
                const paragraph = new Paragraph({
                    title: title,
                    content: content,
                    wordcount: wordcount,
                    quizs: quiz,
                    plaintext: plaintext,
                    so: sortNum
                })
                return paragraph.save()
            })
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
        Paragraph.find()
            .then(p => {
                if (p) {
                    console.log(p)
                    return sortNum = +p.length + 1
                } else {
                    return sortNum = 1
                }
            })
            .then(sortNum => {
                const paragraph = new Paragraph({
                    title: title,
                    content: content,
                    wordcount: wordcount,
                    quizs: quizlist,
                    plaintext: plaintext,
                    so: sortNum
                })
                return paragraph.save()
            })
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
    const sortNum = req.body.sortNum;
    Paragraph.findOne({
            _id: pId
        })
        .then(p => {
            p.title = title;
            p.content = content;
            p.wordcount = wordcount;
            p.sortnum = sortNum;
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
exports.sortP = (req, res, next) => {
    const sortnum = req.body.sortNum;
    const pId = req.body.pId;
    Paragraph.findById(pId)
        .then(p => {
            p.so = sortnum;
            return p.save()
        })
        .then(r => {
            res.send(JSON.stringify({
                'message': 'ok'
            }))
        })
        .catch(err => {
            console.log(err)
        })
}
exports.hideParag = (req, res, next) => {
    const pId = req.params.pId;
    Paragraph.findById(pId)
        .then(p => {
            if (p.hide == false) {
                p.hide = true;
                return p.save()
            } else {
                p.hide = false;
                return p.save()
            }
        })
        .then(result => {
            res.redirect('/admin/read-app')
        })
        .catch(err => {
            console.log(err)
        })
}
// mix
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
        .then(u => {
            const speeds = [];
            u.test.forEach(t => {
                let speed = +t.speed;
                speeds.push(speed);
            })
            res.render('admin/user', {
                u: u,
                maxSpeed: Math.max(...speeds)
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.postEdituser = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const uId = req.params.uId;
    User.findById(uId)
        .then(u => {
            u.name = name;
            u.password = password;
            return u.save();
        })
        .then(result => {
            res.redirect(`/admin/user/${uId}`);
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeUser = (req, res, next) => {
    const uId = req.params.uId;
    User.findByIdAndRemove(uId)
        .then(r => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addUser = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    User.find({
            name: name
        })
        .then(u => {
            if (u) {
                return res.send('err: هذا الاسم موجود بالفعل');
            }
            const user = new User({
                name: name,
                password: password,
                role: 'basic'
            })
            return user.save()
        })
        .then(result => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeLesson = (req, res, next) => {
    const lesson = req.body.lessonId;
    const user = req.params.uId;
    User.findById(user)
        .then(u => {
            const newLarr = u.test.filter(t => {
                return t._id.toString() !== lesson.toString()
            })
            u.test = newLarr;
            return u.save()
        })
        .then(result => {
            res.redirect(`/admin/user/${user}`)
        })
        .catch(err => {
            console.log(err)
        })
}
exports.readRule = (req, res, next) => {
    const readRules = req.body.readRule;
    const lightRules = req.body.lightRule;
    Rule.findOne()
        .then(r => {
            if (!r) {
                const r = new Rule({
                    read: readRules,
                    light: lightRules
                })
                return r.save()
            }
            r.read = readRules;
            r.light = lightRules;
            return r.save()
        })
        .then(result => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}