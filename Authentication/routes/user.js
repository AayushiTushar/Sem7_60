const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req,res) => {
    res.render("login")
})
router.get('/register', (req,res) => {
    res.render("register")
})
router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body
    let errors = [];
    if(!email || !name || !password || !password2) {
        errors.push({msg: "Please fill in all fields "})
    }
    if(password != password2) {
        errors.push({msg: "Passwrod doesn't match"})
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        User.findOne({ email: email })
            .then( user => {
                if(user) {
                    // User Exists
                    errors.push({ msg: "Email is already registerd"})
                    res.render('register', {errors, name, email, password,password2 })
                } else {
                    const newUser = new User({name,email,password})

                    bcrypt.genSalt(10, (err,salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then( user => {
                                    req.flash('success_msg','You are now registered. You can Login')
                                    res.redirect('/User/login');
                                })
                                .catch(err => console.log(err) )
                        })
                    })
                }
            })
    }
})

//login handle
router.post('/login', (req,res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req,res,next)
})

router.get('/logout', (req,res,next) => {
    req.logout();
    req.flash('success_msg','you are logged out')
    res.redirect('/user/login')
})
module.exports = router