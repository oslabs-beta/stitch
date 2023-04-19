const mongoose = require('mongoose');

// ENVIRONMENT VARIABLES
require("dotenv").config();
const DB_USER = process.env.DB_USER;
const DB_PW = process.env.DB_PW;

// Connects to MongoDB to store schema templates
const URI = `mongodb+srv://${DB_USER}:${DB_PW}@softballstatstracker.pmno3ay.mongodb.net/softballStatsTracker?retryWrites=true&w=majority`;
mongoose.connect(URI);

const { Schema, model } = mongoose;

const userGithubSchema = new Schema({
  githubUserName: { type: String, required: true },
  githubUserID: { type: String, required: true },
  githubUserAccessToken: { type: String, required: true },
  githubUserState: [Schema.Types.Mixed],
});

const githubUser = model('githubUser', userGithubSchema);

module.exports = githubUser;

