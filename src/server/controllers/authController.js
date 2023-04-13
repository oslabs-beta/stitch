// ENVIRONMENT VARIABLES
require("dotenv").config();
const GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;
const GH_OAUTH_SECRET = process.env.GH_OAUTH_SECRET;
const axios = require('axios');

const authController = {
  // Handles callbackURL and sets access_token to res.locals
  handleCallbackURL: (req, res, next) => {
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
        res.locals.access_token = result.data.access_token;
        return next()
    }).catch((err) => {
        return next({err});
    })
  },
  // 
  getGithubUserInfo: (req, res, next) => {
    const accessToken = res.locals.access_token;
    axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`
      }
    })
    .then(response => {
      res.locals.userData = response.data;
      return next();
    })
    .catch(error => {
      return next({ error: error.message });
    });
  }
}

module.exports = authController;