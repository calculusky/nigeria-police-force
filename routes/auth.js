const express = require('express');
const router = express.Router();
const { signupValidator } = require('../middlewares/validator');

const {
    getSignup,
    getLogin,
    postSignup
} = require('../controllers/auth');

router.get('/signup', getSignup);
router.post('/signup', signupValidator, postSignup)

router.get('/login', getLogin);

module.exports = router;