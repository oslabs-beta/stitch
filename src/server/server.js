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

// ENVIRONMENT VARIABLES
require('dotenv').config();
const GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;
const GH_OAUTH_SECRET = process.env.GH_OAUTH_SECRET;
const GH_SESSION_SECRET = process.env.GH_SESSION_SECRET;
const GH_CALLBACK_URL = 'http://localhost:8080/auth/github/callback';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve css file
app.use(express.static(path.resolve(__dirname, '../client/assets/css')));

// Landing page
app.get('/', (req, res) => {
  return res.sendStatus(200);
});

// GitHub OAuth Implementation
// Endpoint to authorize user (redirects to github for authorization)
app.get('/auth/github', (req, res) => {
  // console.log(GH_OAUTH_CLIENT_ID);
  // console.log(GH_OAUTH_SECRET);
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GH_OAUTH_CLIENT_ID}`
  );
  // Endpoint to authorize user (redirects to github for authorization)
  app.get('/auth/github', (req, res) => {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GH_OAUTH_CLIENT_ID}`
    );
  });

  // After user authorizes, GitHub sends us back to our redirect URL
  // we handle the redirect by running a POST request with the provided request query code provided by GitHub
  app.get(
    '/auth/github/callback',
    authController.handleCallbackURL,
    authController.getGithubUserInfo,
    cookieController.setCookie,
    dataController.setGitHubUserInfo,
    dbController.addGithubUser,
    (req, res) => {
      // console.log('In callback URL get request');
      // console.log('Request query string', req.query);
      // console.log('Request query code', req.query.code);
      // console.log('about to run POST request to get token')
      // // Sends POST request to get access_token back from github
      // axios.post("https://github.com/login/oauth/access_token", {
      //     client_id: GH_OAUTH_CLIENT_ID,
      //     client_secret: GH_OAUTH_SECRET,
      //     code: req.query.code
      // }, {
      //     headers: {
      //         Accept: "application/json"
      //     }
      // }).then((result) => {
      //     console.log('access token', result.data.access_token)
      //     console.log('result data', result.data)
      //     res.locals.access_token = result.data.access_token;
      //     res.send("you are authorized " + result.data.access_token)
      // }).catch((err) => {
      //     console.log(err);
      // })
      // console.log(res.locals.access_token);
      console.log('back in server endpoint');
      console.log('user data', res.locals.userData);
      return res.status(200).redirect('/');
    }
  );

  // test1 api
  app.get('/one', dataController.getOne, (req, res) => {
    return res.status(200).json(res.locals.data);
  });
  //test2 a lot of info in MewTwo Pokemon
  app.get('/pokemon', dataController.getPokemon, (req, res) => {
    return res.status(200).json(res.locals.data);
  });
  // console.log('user data', res.locals.userData);
  return res.status(200).redirect('/');
});

// Get saved views of github user
app.get('/api/githubdata', dbController.getSavedViews, (req, res) => {
  console.log(res.locals.savedViews);
  return res.status(200).json('received get request');
})

// Save state to users github document
app.post('/api/githubdata', dbController.saveView, (req, res) => {
  // console.log(res.locals.savedViews);
  return res.status(200).json('received post request');
})

// dynamic endpoint
app.post('/postURL', dataController.getUrlResponse, (req, res) => {
  return res.status(200).json(res.locals.data);
});

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
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
