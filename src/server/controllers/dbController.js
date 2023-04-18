const mongoose = require('mongoose');
const githubUser = require('../../db/db');

// ENVIRONMENT VARIABLES
require('dotenv').config();
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;

// Connects to MongoDB to store schema templates
const URI = `mongodb+srv://${DB_USER}:${DB_PW}@softballstatstracker.pmno3ay.mongodb.net/softballStatsTracker?retryWrites=true&w=majority`;
mongoose.connect(URI);

const dbController = {
  // Update state with user GitHub info
  addGithubUser: async (req, res, next) => {
    try {
      // Extract from request body
      console.log('in db controller');
      const { login, id, avatar_url } = res.locals.userData;
      const accessToken = res.locals.access_token;

      // Check to see if user already exists and if so return next()
      const userCheck = await githubUser.findOne({ githubUserID: id });
      console.log('user check result', userCheck);
      if (userCheck !== null) {
        return next();
      }

      // Else add user to DB
      const newUser = new githubUser({
        githubUserName: login,
        githubUserID: id,
        githubUserIcon: avatar_url,
        githubUserAccessToken: accessToken,
        githubUserState: [],
      });
      const newUserEntry = await newUser.save();
      console.log('saved user to db', newUserEntry);
      return next();
    } catch {
      return next({
        log: 'Express error handler caught error in dbController.addGithubUser middleware',
        status: 500,
        message: { err: 'Error saving entry to DB' },
      });
    }
  },

  getSavedViews: async (req, res, next) => {
    try {
      const { id } = req.query;
      const savedViews = await githubUser.find({ githubUserID: id });
      // console.log(savedViews)
      res.locals.savedViews = savedViews[0].githubUserState;
      // console.log('res locals', res.locals.savedViews);
      return next();
    } catch {
      return next({
        log: 'Express error handler caught error in dbController.getSavedViews middleware',
        status: 500,
        message: { err: 'Error retrieving saved views' },
      });
    }
  },

  saveView: async (req, res, next) => {
    try {
      const { responseData, schemaSlice, viewName, id } = req.body;
      console.log('in saveView middleware');
      const viewSnapshot = {
        snapshot: {
          viewName,
          responseData,
          schemaSlice,
        },
      };
      const myUser = await githubUser.findOneAndUpdate(
        { githubUserID: id },
        { $push: { githubUserState: viewSnapshot } }
      );
      // console.log({ myUser });
      console.log('was able to update myUser doc locally');
      // await myUser.save();
      return next();
    } catch {
      return next({
        log: 'Express error handler caught error in dbController.saveView middleware',
        status: 500,
        message: { err: 'Error saving view' },
      });
    }
  },
};

module.exports = dbController;
