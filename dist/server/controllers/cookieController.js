var cookieController = {
    // Stores cookie with github user access token
    setCookie: function (req, res, next) {
        var _a = res.locals.userData, login = _a.login, id = _a.id, avatar_url = _a.avatar_url;
        // console.log({ login, id, avatar_url });
        res.cookie('ghToken', res.locals.access_token);
        res.cookie('ghInfoUser', login);
        res.cookie('ghInfoID', id);
        res.cookie('ghIcon', avatar_url);
        return next();
    },
};
module.exports = cookieController;
//# sourceMappingURL=cookieController.js.map