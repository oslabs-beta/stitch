const cookieController = {
  // Stores cookie with github user access token
  setCookie: (req, res, next) => {
    const { login, id } = res.locals.userData;
    res.cookie('ghToken', res.locals.access_token);
    res.cookie('ghInfoUser', login);
    res.cookie('ghInfoID', id);
    return next();
  },
};

module.exports = cookieController;
