var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var mongoose = require('mongoose');
var githubUser = require('../../db/db');
// ENVIRONMENT VARIABLES
require('dotenv').config();
var DB_USER = process.env.DB_USER;
var DB_PW = process.env.DB_PW;
// Connects to MongoDB to store schema templates
var URI = "mongodb+srv://".concat(DB_USER, ":").concat(DB_PW, "@softballstatstracker.pmno3ay.mongodb.net/softballStatsTracker?retryWrites=true&w=majority");
mongoose.connect(URI);
var dbController = {
    // Update state with user GitHub info
    addGithubUser: function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _a, login, id, avatar_url, accessToken, userCheck, newUser, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _a = res.locals.userData, login = _a.login, id = _a.id, avatar_url = _a.avatar_url;
                    accessToken = res.locals.access_token;
                    return [4 /*yield*/, githubUser.findOne({ githubUserID: id })];
                case 1:
                    userCheck = _c.sent();
                    if (userCheck !== null) {
                        return [2 /*return*/, next()];
                    }
                    newUser = new githubUser({
                        githubUserName: login,
                        githubUserID: id,
                        githubUserIcon: avatar_url,
                        githubUserAccessToken: accessToken,
                        githubUserState: [],
                    });
                    return [4 /*yield*/, newUser.save()];
                case 2:
                    _c.sent();
                    return [2 /*return*/, next()];
                case 3:
                    _b = _c.sent();
                    return [2 /*return*/, next({
                            log: 'Express error handler caught error in dbController.addGithubUser middleware',
                            status: 500,
                            message: { err: 'Error saving entry to DB' },
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // Get all saved view
    getSavedViews: function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var id, savedViews, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.query.id;
                    return [4 /*yield*/, githubUser.find({ githubUserID: id })];
                case 1:
                    savedViews = _b.sent();
                    res.locals.savedViews = savedViews[0].githubUserState;
                    return [2 /*return*/, next()];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, next({
                            log: 'Express error handler caught error in dbController.getSavedViews middleware',
                            status: 500,
                            message: { err: 'Error retrieving saved views' },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Save a view
    saveView: function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _a, responseData, schemaSlice, viewName, id, viewSnapshot, myUser, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.body, responseData = _a.responseData, schemaSlice = _a.schemaSlice, viewName = _a.viewName, id = _a.id;
                    viewSnapshot = {
                        snapshot: {
                            viewName: viewName,
                            responseData: responseData,
                            schemaSlice: schemaSlice,
                        },
                    };
                    return [4 /*yield*/, githubUser.findOneAndUpdate({ githubUserID: id }, { $push: { githubUserState: viewSnapshot } })];
                case 1:
                    myUser = _c.sent();
                    // await myUser.save();
                    return [2 /*return*/, next()];
                case 2:
                    _b = _c.sent();
                    return [2 /*return*/, next({
                            log: 'Express error handler caught error in dbController.saveView middleware',
                            status: 500,
                            message: { err: 'Error saving view' },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Get one view
    getOneSavedView: function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var _a, viewName_1, id, savedViews, filteredView, returnArray_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.body, viewName_1 = _a.viewName, id = _a.id;
                    return [4 /*yield*/, githubUser.find({ githubUserID: id })];
                case 1:
                    savedViews = _c.sent();
                    filteredView = savedViews[0].githubUserState;
                    returnArray_1 = [];
                    filteredView.forEach(function (el) {
                        if (el.snapshot.viewName === viewName_1) {
                            returnArray_1.push(el.snapshot);
                        }
                    });
                    res.locals.returnedView = returnArray_1;
                    return [2 /*return*/, next()];
                case 2:
                    _b = _c.sent();
                    return [2 /*return*/, next({
                            log: 'Express error handler caught error in dbController.getSavedViews middleware',
                            status: 500,
                            message: { err: 'Error retrieving saved views' },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
module.exports = dbController;
//# sourceMappingURL=dbController.js.map