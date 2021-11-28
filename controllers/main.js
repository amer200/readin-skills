const MainPage = require('../modells/main-page');
const Paragraph = require('../modells/paragraph');
const User = require('../modells/user');
const Blog = require('../modells/blog');
const Rule = require('../modells/rule');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'drhsn.com',
    Port: 465,
    secure: true,
    auth: {
        user: '_mainaccount@drhsn.com',
        pass: 'swujkiwestabrimorubredres'
    }
});
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
            Rule.findOne()
                .then(r => {
                    res.render('main/read-app', {
                        t: t,
                        r: r
                    })
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
                        grade: grade,
                    };
                    u.test.push(uResult);
                    u.save()
                })
            return grade
        })
        .then(grade => {
            let level = (((((speed - 150) * 100) / 350) + grade) / 2);
            if (level <= 60) {
                level = 'مستوى ضعيف';
            } else if (85 < level > 60) {
                level = ' مستوى جيد';
            } else if (level >= 85) {
                level = ' مستوى ممتاز';
            }
            res.render('main/read-test-result', {
                grade: grade,
                speed: speed,
                level: level
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
    Paragraph.find({}, 'title')
        .then(t => {
            Rule.findOne()
                .then(r => {
                    res.render('main/light-speed', {
                        t: t,
                        r: r
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getLightTest = (req, res, next) => {
    const pId = req.body.text;
    const wordnum = req.body.wordnum;
    const speed = req.body.speed;
    console.log(speed);
    if (!pId) {
        res.render('main/light-test', {
            err: 'يجب اختيار القطعة'
        });
    } else {
        Paragraph.findById(pId, "plaintext")
            .then(p => {
                res.render('main/light-test', {
                    p: p,
                    err: false,
                    wNum: wordnum,
                    speed: speed
                })
            })
            .catch(err => {
                console.log(err)
            });
    }
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
            res.render('main/user', {
                u: u,
                maxSpeed: Math.max(...speeds)
            })
        })
        .catch(err => {
            console.log(err)
        })
}
// contact
exports.getContact = (req, res, next) => {
    res.render('main/contact-us');
}
exports.postContact = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.name;
    const mail = {
        from: 'contact@drhsn.com',
        to: 'hsnpal99@gmail.com',
        subject: 'بيئةالتعلم/اتصل بنا',
        text: `من ${name} <${email}> \n${message}`,
    };
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('error ):');
        } else {
            res.status(200).send("تم اراسال الرسالة");
        }
    });
}