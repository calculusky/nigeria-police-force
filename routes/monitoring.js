const express = require('express');
const router = express.Router();

const {
    getNode
} = require('../controllers/monitoring');

router.get('/node', getNode);

module.exports = router;