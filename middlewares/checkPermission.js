exports.checkPermission = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/admin/login');
    }
    next();
}

exports.preventLoggedInUser = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/admin')
    }
    next();
}