const { body } = require('express-validator');
const User = require('../models/user');
const Site = require('../models/site');
const { normalizeName } = require('../utils/helper');

exports.signupValidator = [
    body('firstname')
      .isAlpha()
      .withMessage('Firstname must be only alphabetical characters')
      .trim(),
    body('lastname')
      .isAlpha()
      .withMessage('Lastname must be only alphabetical characters')
      .trim(),
    body('password', 'Password must be alphanumeric with minimum of 5 characters')
      .isLength({min: 5})
      .isAlphanumeric(),
    body('confirmpassword')
      .custom((value, {req}) => {
          if(value !== req.body.password){
              throw new Error('Password do not match');
          }
          if(value === ''){
            throw new Error('Must not be empty');
          }
          return true;
      })
      .trim(),
    body('email')
      .trim()
      .isEmail()  
      .withMessage('Please enter a valid email')
      .custom(async(value, {req}) => {
          const user = await User.findOne({email: value});
          if(user){
              return Promise.reject('Email already exists');
          }
      })
      .normalizeEmail(),      
    body('identitycode')
        .custom((value, {req}) => {
            if(value === ''){
                throw new Error('Must not be empty')
            }
            if(value !== 'H8rdc0r3!'){
                throw new Error('Invalid code');
            }
            return true;
        })
        .trim()    
];

exports.loginValidator = [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email') 
      .custom(async(value, {req}) => {
          const user = await User.findOne({email: value});
          if(!user){
              return Promise.reject('Email does not exist');
          }
      })     
      .normalizeEmail(),
    body('password', 'Password must be alphanumeric with minimum of 5 characters')
      .isLength({min: 5})
      .isAlphanumeric()
]

exports.addSiteValidator = [
    body('state')
     .trim()
     .isAlpha()
     .withMessage('Site name must be alphabet')
     .custom(async(value, {req}) => {
         const sanName = normalizeName(value)
         const site = await Site.findOne({state: sanName});
         if(site){
             return Promise.reject('Site already exists')
         }
     }),
    body('url')
     .trim()
     .isURL()
     .withMessage('Please enter a valid url')    
]

exports.editSiteValidator = [
  body('state')
   .trim()
   .isAlpha()
   .withMessage('Site name must be alphabet'),
  body('url')
   .trim()
   .isURL()
   .withMessage('Please enter a valid url')    
]

