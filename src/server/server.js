// SERVER INFO
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const cookieParser = require('cookie-parser');
const dataController = require('./controllers/dataController');
const authController = require('./controllers/authController');
const cookieController = require('./controllers/cookieController');
const dbController = require('./controllers/dbController');
const PORT = 3000;
const session = require('express-session');

// ENVIRONMENT VARIABLES
require("dotenv").config();
const GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;
const GH_OAUTH_SECRET = process.env.GH_OAUTH_SECRET;
const GH_SESSION_SECRET = process.env.GH_SESSION_SECRET;
const GH_CALLBACK_URL = 'http://localhost:8080/auth/github/callback';

//CONFIGURING EXPRESS SESSION
app.use(session({
  secret: 'password',
  cookie: {
   
  }, 
  //GENID causes errors?
  // genid: function () {
  //   return gennuid(); 
  // }, 
  //DEPRECATED, CAN'T HAVE UNDEFINED saveUninitialized AND resave KEYS
  //FORCES SESSION TO BE SAVE BACK TO SESSION STORE (DB)
  // store: 
  resave: false,
  saveUninitialized: true,
  name: 'Express Session Cookie',

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve css file
app.use(express.static(path.resolve(__dirname, '../client/assets/css')));

// Landing page
app.get('/', (req, res) => {
  // if (req.session.timesVisited) {
  //   req.session.timesVisited++;
  //   console.log('You visited this page' + req.session.timesVisited + 'times')
  //   return res.sendStatus(200).send('You visited this page' + req.session.timesVisited + 'times')
  // } else {
  //   req.session.timesVisited = 1
    return res.status(200).send(path.resolve(__dirname, '../client/index.html'));
  // }
});


// GitHub OAuth Implementation
  // Endpoint to authorize user (redirects to github for authorization)
app.get("/auth/github", (req, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${GH_OAUTH_CLIENT_ID}`);
});

// After user authorizes, GitHub sends us back to our redirect URL
 // we handle the redirect by running a POST request with the provided request query code provided by GitHub
app.get(
  "/auth/github/callback", 
  authController.handleCallbackURL,
  authController.getGithubUserInfo,
  cookieController.setCookie,
  dataController.setGitHubUserInfo,
  dbController.addGithubUser,
  (req, res) => {
    // console.log('user data', res.locals.userData);
    return res.status(200).redirect('/');
})

// dynamic endpoint
app.post('/postURL', dataController.getUrlResponse, (req, res) => {
  return res.status(200).json(res.locals.data);
})

// Unknown route handler
app.use('*', (req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
