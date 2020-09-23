const { check, body } = require('express-validator');
const User = require('../models/user');

exports.signupValidator = [
    body('firstname')
      .isAlpha()
      .withMessage('Firstname must be only alphabetical characters')
      .trim(),
    body('lastname')
      .isAlpha()
      .withMessage('Lastname must be only alphabetical characters')
      .trim(),
    body('password', 'Password must contain only alphanumeric with minimum of 5 characters')
      .isLength({min: 5})
      .isAlphanumeric()
      .trim(),
    body('confirmpassword')
      .custom((value, {req}) => {
          if(value !== req.body.password){
              throw new Error('password do not match')
          }
          return true;
      }),
    body('email')
      .isEmail()
      .withMessage('Invalid email')
      .custom(async(value, {req}) => {
          const user = await User.findOne({email: value});
          if(user){
              return Promise.reject('Email already exists');
          }
      })
     
]
