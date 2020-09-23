require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//import custom files
const authRoutes = require('./routes/auth');
const monitoringRoutes = require('./routes/monitoring');
const npfabisRoutes = require('./routes/npfabis');

//set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//serve static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))

//register middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//register routes
app.use(npfabisRoutes);
app.use(authRoutes);
app.use('/monitoring', monitoringRoutes);

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




