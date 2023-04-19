const cookieController = {
  // Stores cookie with github user access token
  setCookie: (req, res, next) => {
    const { login, id, avatar_url } = res.locals.userData;
    // console.log({ login, id, avatar_url });
    res.cookie('ghToken', res.locals.access_token);
    res.cookie('ghInfoUser', login);
    res.cookie('ghInfoID', id);
    res.cookie('ghIcon', avatar_url);
    return next();
  },
};

module.exports = cookieController;
