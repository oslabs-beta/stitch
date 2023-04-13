const dataController = {
  // Received passed in endpoint and runs get request
  getUrlResponse: async (req, res, next) => {
    const { url } = req.body;
    try {
      const request = await fetch(url);
      const data = await request.json();
      console.log('in server middleware', data);
      res.locals.data = data;
      return next();
    } catch {
      return next({
        log: 'Express error handler caught error in dataController.getUrlResponse',
        status: 500,
        message: { err: 'Failed to get data' },
      });
    }
  },
  // Update state with user GitHub info
  setGitHubUserInfo: (req, res, next) => {
    console.log('in set github middleware');
    const { login, id } = res.locals.userData;
    const accessToken = res.locals.access_token;
    return next();
  }
};

module.exports = dataController;
