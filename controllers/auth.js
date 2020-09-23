const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        title: 'Signup',
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
exports.postSignup = (req, res, next) => {
    const {
        firstname,
        lastname,
        password,
        confirmpassword,
        email,
        identitycode
    } = req.body;

    const errors = validationResult(req);
    //console.log(errors, 'errr----')
    console.log(errors.array(), 'err-array*****')
    if(!errors.isEmpty()){
        res.status(422).render('auth/signup', {
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

}

exports.getLogin = (req, res, next) => {
    res.render('auth/login')
}