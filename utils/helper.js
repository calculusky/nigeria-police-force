
exports.normalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

exports.userOptions = (req, userConfig = { user: 'public', adminName: undefined}) => {
   if(req.user){
       userConfig.user = 'admin';
       userConfig.adminName = req.user.firstname;
   }
  return userConfig;
}