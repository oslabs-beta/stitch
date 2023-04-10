// ENVIRONMENT VARIABLES
require("dotenv").config();
const GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;
const GH_OAUTH_SECRET = process.env.GH_OAUTH_SECRET;
const GH_SESSION_SECRET = process.env.GH_SESSION_SECRET;
const GH_CALLBACK_URL = 'http://localhost:8080/auth/github/callback';
const axios = require('axios');

const authController = {
  // Handles callbackURL and sets access_token to res.locals
  handleCallbackURL: (req, res, next) => {
    console.log('In callback URL get request');
    console.log('Request query string', req.query);
    console.log('Request query code', req.query.code);
    console.log('about to run POST request to get token')
    // Sends POST request to get access_token back from github
    axios.post("https://github.com/login/oauth/access_token", {
        client_id: GH_OAUTH_CLIENT_ID,
        client_secret: GH_OAUTH_SECRET,
        code: req.query.code
    }, {
        headers: {
            Accept: "application/json"
        }
    }).then((result) => {
        console.log('access token', result.data.access_token)
        console.log('result data', result.data)
        res.locals.access_token = result.data.access_token;
        return next()
    }).catch((err) => {
        return next({err});
    })
  },
  // 
  getGithubUserInfo: (req, res, next) => {
    console.log('in getGithubUbserInfo')
    const accessToken = res.locals.access_token;
    axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`
      }
    })
    .then(response => {
      // res.json(response.data);
      res.locals.userData = response.data;
      // console.log(res.json(response.data));
      return next();
    })
    .catch(error => {
      return next({ error: error.message });
      // res.status(500).json();
    });
  }
}

module.exports = authController;