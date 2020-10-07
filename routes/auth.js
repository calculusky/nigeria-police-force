const express = require('express');
const router = express.Router();
const { signupValidator, loginValidator } = require('../middlewares/validator');
const { checkPermission, preventLoggedInUser } = require('../middlewares/checkPermission');

const {
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    postLogout
} = require('../controllers/auth');

router.get('/signup',  preventLoggedInUser, getSignup);
router.post('/signup', signupValidator, postSignup)

router.get('/login', preventLoggedInUser, getLogin);
router.post('/login', loginValidator, postLogin);
router.post('/logout', postLogout);

module.exports = router;