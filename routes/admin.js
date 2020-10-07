const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/checkPermission');
const { addEditSiteValidator } = require('../middlewares/validator');
const {
    getAddSite,
    getIndex,
    postAddSite,
    getEditSite,
    postEditSite,
    deleteSite
} = require('../controllers/admin')

router.get('/', checkPermission, getIndex);
router.get('/addsite', checkPermission, getAddSite);
router.post('/addsite', addEditSiteValidator, postAddSite);
router.get('/editsite/:siteId',  checkPermission, getEditSite)
router.post('/editsite', addEditSiteValidator, postEditSite)
router.post('/deletesite/:siteId', checkPermission, deleteSite);

module.exports = router;