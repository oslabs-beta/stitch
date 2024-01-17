var mongoose = require('mongoose');
// ENVIRONMENT VARIABLES
require('dotenv').config();
var DB_USER = process.env.DB_USER;
var DB_PW = process.env.DB_PW;
// Connects to MongoDB to store schema templates
var URI = "mongodb+srv://".concat(DB_USER, ":").concat(DB_PW, "@softballstatstracker.pmno3ay.mongodb.net/softballStatsTracker?retryWrites=true&w=majority");
mongoose.connect(URI);
var Schema = mongoose.Schema, model = mongoose.model;
var userGithubSchema = new Schema({
    githubUserName: { type: String, required: true },
    githubUserID: { type: String, required: true },
    githubUserAccessToken: { type: String, required: true },
    githubUserState: [Schema.Types.Mixed],
});
var githubUser = model('githubUser', userGithubSchema);
module.exports = githubUser;
//# sourceMappingURL=db.js.map