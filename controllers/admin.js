const Site = require('../models/site');
const User = require('../models/user');
const { normalizeName } = require('../utils/helper');
const { validationResult } = require('express-validator');
const { userOptions } = require('../utils/helper');

exports.getIndex = async (req, res, next) => {
    const userConfig = userOptions(req);   
    res.render('npfabis/index', {
        user: userConfig.user,
        adminName: userConfig.adminName,
        path: '/admin',
    })
}

exports.getAddSite = async (req, res, next) => {
        res.render('admin/add-edit-site', {
            adminName: req.user.firstname,
            user: 'admin',
            path: '/admin/addsite',
            hasError: false,
            editing: false,
            validationErrors: []
        });
}

exports.postAddSite = async (req, res, next) => {
    const { state, url } = req.body;
    const errors = validationResult(req);
    //console.log(errors)
    if(!errors.isEmpty()){
        return res.status(422).render('admin/add-edit-site', {
            user: 'admin',
            adminName: req.user.firstname,
            user: 'admin',
            path: '/admin/addsite',
            hasError: true,
            editing: false,
            validationErrors: errors.array(),
            site: {
                state: state,
                url: url
            }
        })
    }
    try {
        const newSite = new Site({
            state: normalizeName(state),
            url: url
        })
        const savedSite = await newSite.save();
        //console.log(savedSite)
        if(savedSite){
            return res.redirect('/monitoring/nodes');
        }
    } catch (error) {
        console.log(error);
        next(error)
    }

}

exports.getEditSite = async (req, res, next) => {
    const siteId = req.params.siteId;
    const editmode = req.query.edit;
    const site = await Site.findById(siteId);
    if(!site){
        return res.redirect('/monitoring/nodes')
    }
    return res.render('admin/add-edit-site', {
        adminName: req.user.firstname,
        user: 'admin',
        path: '/admin/addsite',
        hasError: false,
        editing: editmode,
        site: site,
        validationErrors: [],
        site: site
    })
}

exports.postEditSite = async (req, res, next) => {
    const { state, url, siteId } = req.body;
    const userConfig = userOptions(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('admin/add-edit-site', {
            adminName: userConfig.adminName,
            user: userConfig.user,
            path: '/admin/edisite',
            hasError: true,
            editing: true,
            validationErrors: errors.array(),
            site: {
                state: state,
                url: url,
                _id: siteId
            }
        })
    }
   try {
        const site = await Site.findById(siteId);
        if(!site){
            res.redirect('/editsite');
        }
        site.state = state;
        site.url = url;
        await site.save();
        return res.redirect('/monitoring/nodes')
   } catch (error) {
       console.log(error)
       next(error);
   }
}

exports.deleteSite = async (req, res, next) => {
    const siteId = req.params.siteId;
    //console.log(siteId)
   try {
      const site = await Site.findById(siteId);
      if(!site){
          const error = new Error('site not found');
          error.status = 404;
          throw error;
      }
      const deleted = await Site.deleteOne({_id: siteId});
      if(deleted){
          return res.status(200).json({message: 'site successfully deleted'})
      } 

   } catch (error) {
     console.log(error);
     next(error);  
   }
}