const User = require('../models/user');
const { hash, compare } = require('bcryptjs');
const { validationResult } = require('express-validator');
const { normalizeName } = require('../utils/helper');
const { userOptions } = require('../utils/helper');

exports.getSignup = (req, res, next) => {
    const userConfig = userOptions(req);
    res.render('auth/signup', {
        user: userConfig.user,
        title: 'Signup',
        path: '/admin/signup',
        validationErrors: [],
        oldInputs: {
            firstname: null,
            lastname: null,
            password: null,
            confirmpassword: null,
            email: null,
            identitycode: null
        }
    })
}
exports.postSignup = async (req, res, next) => {
    const userConfig = userOptions(req);
    const {
        firstname,
        lastname,
        password,
        confirmpassword,
        email,
        identitycode
    } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(422).render('auth/signup', {
            user: userConfig.user,
            title: 'Signup',
            validationErrors: errors.array(),
            oldInputs: {
                firstname,
                lastname,
                password,
                confirmpassword,
                email,
                identitycode
            }
        })
    }

    //hash the the password and create new user
   try {
    const hashedPassword = await hash(password, 12);
    const user = new User({
       firstname: normalizeName(firstname),
       lastname: normalizeName(lastname),
       password: hashedPassword,
       email: email,        
    })
    await user.save();
    return res.redirect('/admin/login');

   } catch (error) {
       console.log(error);
      next(error); 
   }
}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        user: 'admin',
        title: 'Login',
        path: '/admin/login',
        validationErrors: [],
        loginErrors: [],
        oldInputs: {
            email: null,
            password: null,
        }
    });
}

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    //handle validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/login', {
            user: 'admin',
            title: 'Login',
            path: '/admin/login',
            loginErrors: [],
            validationErrors: errors.array(),
            oldInputs: {
                email: email,
                password: password,
            }
        })
    }

    try {
        const user = await User.findOne({email: email});
        const loginErrors = [];
        
        //check for password        
        const matched = await compare(password, user.password);
        if(!matched){
            loginErrors.push({
                msg: 'Password is incorrect',
                param: 'password'
            });
            return res.status(422).render('auth/login', {
                user: 'admin',
                title: 'Login',
                path: '/admin/login',
                validationErrors: [],
                loginErrors: loginErrors,
                oldInputs: {
                    email: email,
                    password: password,
                }
            })
         }

        //setup user session
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save(err => {
            if(err){
                console.log(err);
            }
           return res.redirect('/admin')
        })

    } catch (error) {
        console.log(error, 'err');
        error.status = 500;
        next(error)
    }
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        if(err){
            return next(err)
        }
        res.redirect('/admin/login')
    })
}