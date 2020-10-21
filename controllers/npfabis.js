const Site = require('../models/site');
const { userOptions } = require('../utils/helper');

exports.getIndex = (req, res, next) => {
    res.render('npfabis/index', {
        user: 'public',
        path: '/',
        title: 'NPF Management System'
    });
}

exports.getNodes = async (req, res, next) => {
    //console.log(req.session, '--sess--nodes')
   const userConfig = userOptions(req);
   try {
    const sites = await Site.find();   
    res.render('npfabis/nodes', {
        user: userConfig.user,
        adminName: userConfig.adminName,
        path: '/monitoring/node',
        title: 'Network Monitoring',
        sites: sites
    });
   } catch (error) {
       console.log(error);
      next(error) 
   }
}

