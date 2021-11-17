// const express = require('express');
// const ejs = require('ejs');
const mongoose = require('mongoose');
const User = require('../modells/user');
//const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {
    res.render('auth/auth', {
        nameErr: false,
        passwordErr: false,
        route: 'login'
    });
    console.log(req.session);
}
exports.postLogin = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({
            name: name
        })
        .then(user => {
            if (!user) {
                console.log('not user')
                return res.render('auth/auth', {
                    nameErr: 'اسم الطالب خطاء',
                    passwordErr: false,
                    route: 'login'
                });
            } else {
                if (user.password === password) {
                    req.session.user = user;
                    console.log(req.session.user.role);
                    if (req.session.user.role === 'admin') {
                        res.redirect('/admin')
                    } else {
                        res.redirect('/')
                    }
                } else {
                    return res.render('auth/auth', {
                        passwordErr: 'كلمة المرور خطاء',
                        nameErr: false,
                        route: 'login'
                    });
                }
            }
        })
}
exports.getSignup = (req, res, next) => {
    res.render('auth/auth', {
        route: 'signup',
        nameErr: false
    })
}
exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({
            name: name
        })
        .then(user => {
            if (user) {
                res.render('auth/auth', {
                    route: 'signup',
                    nameErr: 'اسم الطالب غير متاح'
                })
            }
            const newUser = new User({
                name: name,
                password: password,
                role: 'basic'
            });
            return newUser.save()
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
}