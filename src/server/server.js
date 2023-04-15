// SERVER INFO
const express = require('express');
const path = require('path');
const app = express();
const dataController = require('./controllers/dataController');
const authController = require('./controllers/authController');
const cookieController = require('./controllers/cookieController');
const dbController = require('./controllers/dbController');
const PORT = 3000;

// ENVIRONMENT VARIABLES
require("dotenv").config();
const GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve css file
app.use(express.static(path.resolve(__dirname, '../client/assets/css')));

// Landing page
app.get('/', (req, res) => {
  return res.sendStatus(200);
});

// test1 api
app.get('/one', dataController.getOne, (req, res) => {
  return res.status(200).json(res.locals.data);
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
    return res.status(200).redirect('/');
})

// Get saved views of github user
app.get('/api/githubdata', dbController.getSavedViews, (req, res) => {
  return res.status(200).json(res.locals.savedViews);
})

// Save state to users github document
app.post('/api/githubdata', dbController.saveView, (req, res) => {
  return res.status(200).json('received post request');
})

// Send back one saved view
app.post('/api/getview', dbController.getOneSavedView, (req, res) => {
  return res.status(200).json(res.locals.returnedView[0]);
})

// dynamic endpoint
app.post('/postURL', dataController.getUrlResponse, (req, res) => {
  return res.status(200).json(res.locals.data);
})

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});