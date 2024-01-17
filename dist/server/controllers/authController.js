// ENVIRONMENT VARIABLES
require('dotenv').config();
var GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;
var GH_OAUTH_SECRET = process.env.GH_OAUTH_SECRET;
var axios = require('axios');
var authController = {
    // Handles callbackURL and sets access_token to res.locals
    handleCallbackURL: function (req, res, next) {
        // Sends POST request to get access_token back from github
        axios
            .post('https://github.com/login/oauth/access_token', {
            client_id: GH_OAUTH_CLIENT_ID,
            client_secret: GH_OAUTH_SECRET,
            code: req.query.code,
        }, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then(function (result) {
            res.locals.access_token = result.data.access_token;
            return next();
        })
            .catch(function (err) {
            return next({ err: err });
        });
    },
    //
    getGithubUserInfo: function (req, res, next) {
        var accessToken = res.locals.access_token;
        axios
            .get('https://api.github.com/user', {
            headers: {
                Authorization: "token ".concat(accessToken),
            },
        })
            .then(function (response) {
            res.locals.userData = response.data;
            return next();
        })
            .catch(function (error) {
            return next({ error: error.message });
        });
    },
};
module.exports = authController;
//# sourceMappingURL=authController.js.map