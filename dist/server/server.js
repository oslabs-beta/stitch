// SERVER INFO
var express = require('express');
var path = require('path');
var app = express();
import dataController from './controllers/dataController';
// const authController = require('./controllers/authController');
// const cookieController = require('./controllers/cookieController');
// const dbController = require('./controllers/dbController');
var PORT = 3000;
// ENVIRONMENT VARIABLES
require('dotenv').config();
var GH_OAUTH_CLIENT_ID = process.env.GH_OAUTH_CLIENT_ID;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve css file
// app.use(express.static(path.resolve(__dirname, '../client/assets/css')));
app.use(express.static(path.join(__dirname, '../../dist/')));
// Landing page
app.get('/', function (req, res) {
    return res.sendStatus(200);
    // console.log(path.join(__dirname, '../client/index.html'))
    // res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
// test1 api
app.get('/one', dataController.getOne, function (req, res) {
    return res.status(200).json(res.locals.data);
});
// app.get('/auth/github', (req, res) => {
//   return res.redirect(
//     `https://github.com/login/oauth/authorize?client_id=${GH_OAUTH_CLIENT_ID}`
//   );
// });
// app.get(
//   '/auth/github/callback',
//   authController.handleCallbackURL,
//   authController.getGithubUserInfo,
//   cookieController.setCookie,
//   dbController.addGithubUser,
//   (req, res) => {
//     return res.status(200).redirect('/');
//   }
// );
// // Get saved views of github user
// app.get('/api/githubdata', dbController.getSavedViews, (req, res) => {
//   return res.status(200).json(res.locals.savedViews);
// });
// // Save state to users github document
// app.post('/api/githubdata', dbController.saveView, (req, res) => {
//   return res.status(200).json('received post request');
// });
// // Send back one saved view
// app.post('/api/getview', dbController.getOneSavedView, (req, res) => {
//   return res.status(200).json(res.locals.returnedView[0]);
// });
// dynamic endpoint
app.post('/postURL', dataController.getUrlResponse, function (req, res) {
    return res.status(200).json(res.locals.data);
});
// Unknown route handler
app.use(function (req, res) { return res.sendStatus(404); });
// Global error handler
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    var errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
});
app.listen(PORT, function () {
    console.log("Server listening on ".concat(PORT));
});
//# sourceMappingURL=server.js.map