const express = require('express');
const router = express.Router();

const {
    getIndex,
    getNodes
} = require('../controllers/npfabis');

router.get('/', getIndex);
router.get('/monitoring/nodes', getNodes);

module.exports = router;