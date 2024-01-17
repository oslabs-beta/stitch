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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
var initialState = {
    endpointData: {},
    activeEndpoint: {
        url: '',
        responseBody: {},
    },
    githubUserSavedViews: {
        views: [],
    },
};
export var addDataCard = createAsyncThunk('responseData/addDataCard', function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var request, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                })];
            case 1:
                request = _a.sent();
                return [4 /*yield*/, request.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); });
export var saveGithubView = createAsyncThunk('responseData/saveGithubView', function (_a, _b) {
    var viewName = _a.viewName, id = _a.id;
    var getState = _b.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var _c, responseData, schemaSlice, request, data;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = getState(), responseData = _c.responseData, schemaSlice = _c.schemaSlice;
                    return [4 /*yield*/, fetch('/api/githubdata', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify({ responseData: responseData, schemaSlice: schemaSlice, viewName: viewName, id: id }),
                        })];
                case 1:
                    request = _d.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _d.sent();
                    return [2 /*return*/, viewName];
            }
        });
    });
});
export var loadSavedGithubView = createAsyncThunk('responseData/loadSavedGithubView', function (_a, _b) {
    var viewName = _a.viewName, id = _a.id;
    var getState = _b.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var request, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch('/api/getview', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({ viewName: viewName, id: id }),
                    })];
                case 1:
                    request = _c.sent();
                    return [4 /*yield*/, request.json()];
                case 2:
                    data = _c.sent();
                    return [2 /*return*/, data];
            }
        });
    });
});
export var dataSlice = createSlice({
    name: 'responseData',
    initialState: initialState,
    reducers: {
        updateActiveEndpoint: function (state, action) {
            state.activeEndpoint = {
                url: action.payload,
                responseBody: state.endpointData[action.payload],
            };
        },
        storeGithubUserView: function (state, action) {
            state.githubUserSavedViews = {
                views: __spreadArray(__spreadArray([], state.githubUserSavedViews.views, true), [action.payload], false),
            };
        },
        deleteEndpoint: function (state, action) {
            console.log('in dataslice reducers - delete endpoint', action.payload);
            delete state.endpointData[action.payload];
            var endpoints = Object.keys(state.endpointData);
            //handling updating the active endpoint to reflect deleted endpoints
            //if no more endpoints after endpoint is deleted, reset active endpoint to empty
            if (endpoints.length === 0) {
                console.log('in conditional statement');
                state.activeEndpoint = {
                    url: '',
                    responseBody: {},
                };
            }
            //update active endpoint to last endpoint in endpointData state object
            else {
                state.activeEndpoint = {
                    url: endpoints[endpoints.length - 1],
                    responseBody: state.endpointData[endpoints[endpoints.length - 1]],
                };
            }
            // window.location.reload(false)
        },
    },
    extraReducers: function (builder) {
        // Add Data Card Promise Resolve Handler
        builder.addCase(addDataCard.fulfilled, function (state, action) {
            for (var key in action.payload) {
                if (typeof action.payload[key] === 'object' && Array.isArray(typeof action.payload[key]) === false) {
                    action.payload[key] = JSON.stringify(action.payload[key]);
                }
            }
            state.endpointData[action.meta.arg] = action.payload;
            state.activeEndpoint = {
                url: action.meta.arg,
                responseBody: action.payload,
            };
        });
        // Save View Promise Resolve Handler
        builder.addCase(saveGithubView.fulfilled, function (state, action) {
            state.githubUserSavedViews = {
                views: __spreadArray(__spreadArray([], state.githubUserSavedViews.views, true), [action.meta.arg.viewName], false),
            };
        });
        // Update state with saved view data
        builder.addCase(loadSavedGithubView.fulfilled, function (state, action) {
            state.endpointData = action.payload.responseData.endpointData;
            state.activeEndpoint = action.payload.responseData.activeEndpoint;
        });
    },
});
export var updateActiveEndpoint = (_a = dataSlice.actions, _a.updateActiveEndpoint), setActiveUserGithubInfo = _a.setActiveUserGithubInfo, storeGithubUserView = _a.storeGithubUserView, deleteEndpoint = _a.deleteEndpoint;
export default dataSlice.reducer;
//# sourceMappingURL=dataSlice.js.map