require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { userOptions } = require('./utils/helper');
const express = require('express');
const app = express();

//import models
const User = require('./models/user');

//set variables
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URL,
    collection: 'sessions'
})

//import routes
const authRoutes = require('./routes/auth');
const npfabisRoutes = require('./routes/npfabis');
const adminRoutes = require('./routes/admin');

//set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//serve static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))

//register middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT')
//     next();
// })

//send local variables
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
})

//obtain user id from session if logged in
app.use(async(req, res, next) => {
    if(!req.session.user){
        return next();
    }
    try {
        const user = await User.findById(req.session.user._id);
        if(!user){
            return next();
        }
        req.user = user;
        next();

    } catch (error) {
        next(new Error(error));
    }
})

//register routes
app.use('/admin', authRoutes);
app.use('/admin', adminRoutes);
app.use(npfabisRoutes);

//handle errors
app.use((error, req, res, next) => {
    exports.getError = (req, res, next) => {
        const userConfig = userOptions(req)
        res.render('error/error', {
            user: userConfig.user,
            adminName: userConfig.adminName,
            title: 'Error',
            path: '/error'
        });
    }
})

//connect to db
const port = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(connected => {
      app.listen(port, () => {
          console.log(`connection successful at port ${port}`)
      })
  })
  .catch(err => {
      console.log('connection to the database failed', err)
  });




