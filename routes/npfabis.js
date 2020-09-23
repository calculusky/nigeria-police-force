const express = require('express');
const router = express.Router();

const {
    getIndex
} = require('../controllers/npfabis');

router.get('/', getIndex);

module.exports = router;