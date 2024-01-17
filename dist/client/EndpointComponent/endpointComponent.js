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
// Header bar components
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addDataCard, saveGithubView, storeGithubUserView, loadSavedGithubView, } from '../store/slices/dataSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';
export default function EndpointComponent() {
    var _this = this;
    var _a = useCookies([
        'ghInfoUser',
        'ghInfoID',
        'ghToken',
        'ghIcon',
    ]), cookies = _a[0], setCookie = _a[1], removeCookie = _a[2];
    var _b = useState({
        views: [
            React.createElement("option", { value: '', disabled: true, selected: true, hidden: true }, 'Load View'),
        ],
    }), savedViews = _b[0], setSavedViews = _b[1];
    var githubSavedViews = useSelector(function (state) { return state.responseData.githubUserSavedViews.views; });
    var dispatch = useDispatch();
    // Using react state management for Input field text.  No need to store globally in store.
    var inputText = '';
    var viewName = 'Save Current View';
    function handleChange(event) {
        inputText = event.target.value;
    }
    function handleSaveInputChange(event) {
        viewName = event.target.value;
    }
    function handleLogout(event) {
        removeCookie('ghInfoUser');
        removeCookie('ghInfoID');
        removeCookie('ghToken');
        removeCookie('ghIcon');
        window.location.reload();
    }
    // Create async function to retreive saved state if user is logged in
    var getSavedViews = function () { return __awaiter(_this, void 0, void 0, function () {
        var request, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setTimeout(null, 100)];
                case 1:
                    _a.sent();
                    if (!!cookies.ghInfoID) return [3 /*break*/, 2];
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, axios.get('/api/githubdata', {
                        headers: { Accept: 'application/json' },
                        params: { id: cookies.ghInfoID },
                    })];
                case 3:
                    request = _a.sent();
                    temp = [];
                    request.data.forEach(function (obj) {
                        var viewName = obj.snapshot.viewName;
                        dispatch(storeGithubUserView(viewName));
                    });
                    setSavedViews({
                        views: __spreadArray(__spreadArray([], savedViews.views, true), temp, true),
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        getSavedViews();
    }, []);
    var gitHubViewComponents = [
        React.createElement("option", { value: '', disabled: true, selected: true, hidden: true }, 'Load View'),
    ];
    githubSavedViews.forEach(function (view) {
        gitHubViewComponents.push(React.createElement("option", { value: view }, view));
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'flex flex-row justify-between pt-8 pl-5 w-full' },
            React.createElement("div", { className: 'flex flex-row gap-6 basis-3/5' },
                React.createElement("h1", { className: 'font-display text-6xl pt-1 pr-5 text-colorHunt-quatrinary' }, "Stitch"),
                React.createElement("input", { className: 'bg-colorHunt-tertiary text-sm rounded-md w-1/2 h-8 mt-3 pl-4 placeholder:italic focus:outline-desert-ash focus:outline-1', onChange: handleChange, placeholder: inputText }),
                React.createElement("button", { className: 'bg-midnight-fuchsia hover:bg-midnight-rose h-8 mt-3 ml-5 focus:ring-1 ring-vscode-foreground w-24 rounded-md text-white', onClick: function () { return dispatch(addDataCard(inputText)); }, name: 'submit' }, "Add")),
            cookies.ghInfoID ? (
            // Render this if a user is already logged in
            React.createElement("div", { className: 'flex basis-2/5 gap-4' },
                React.createElement("input", { className: 'w-7/12 rounded-md bg-colorHunt-tertiary h-8 mt-3 pl-2 placeholder:italic focus:outline-none mx-2 text-sm', type: 'text', onChange: handleSaveInputChange, placeholder: viewName }),
                React.createElement("button", { className: 'bg-cp-dustyGray-light hover:bg-cp-dustyGray h-8 mt-3 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-md text-slate-800 test-sm', onClick: function () {
                        return dispatch(saveGithubView({ viewName: viewName, id: cookies.ghInfoID }));
                    } }, "Save"),
                React.createElement("select", { className: 'bg-cp-dustyGray-light hover:bg-cp-dustyGray h-8 mt-3 w-max focus:ring-1 ring-colorHunt-tertiary rounded-md text-slate-800 text-sm', onChange: function () {
                        return dispatch(loadSavedGithubView({
                            viewName: event.target.value,
                            id: cookies.ghInfoID,
                        }));
                    } }, gitHubViewComponents),
                React.createElement("button", { className: 'bg-cp-dustyGray-light hover:bg-cp-dustyGray h-8 mt-3 focus:ring-1 ring-colorHunt-tertiary w-28 rounded-md text-slate-800 text-sm', onClick: handleLogout }, 'Logout'),
                React.createElement("div", { className: 'w-12 pt-3' },
                    React.createElement("img", { className: 'rounded-full w-8 h-8', src: cookies.ghIcon })))) : (
            // If not render login button
            React.createElement("div", { className: 'flex flex-row justify-end mr-4 basis-1/5' },
                React.createElement("button", { className: 'bg-cp-dustyGray-light hover:bg-cp-dustyGray rounded-md h-8 mt-3 w-24 relative' },
                    React.createElement("a", { className: '', href: '/auth/github' },
                        React.createElement("svg", { className: 'fill-slate mr-0 pl-2', width: '30%', height: 'auto', viewBox: '0 0 100 100', xmlns: 'http://www.w3.org/2000/svg' },
                            React.createElement("path", { "fill-rule": 'evenodd', "clip-rule": 'evenodd', d: 'M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z' })),
                        React.createElement("span", { className: 'text-slate-800 absolute inset-y-0 top-1 right-4' }, "Login"))))))));
}
//# sourceMappingURL=endpointComponent.js.map