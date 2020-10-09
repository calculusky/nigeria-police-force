const { userOptions } = require('../utils/helper');

exports.getError404 = (req, res, next) => {
    const userConfig = userOptions(req);
    res.status(404).render('error/404', {
        title: 'Error 404',
        user: userConfig.user,
        adminName: userConfig.adminName,
        path: '/404'
    })
}