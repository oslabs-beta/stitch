const dataController = {
  getOne: async (req, res, next) => {
    try {
      const request = await fetch('https://swapi.dev/api/people/1/');
      const data = await request.json();
      res.locals.data = data;
      return next();
    } catch {
      return next({
        log: 'Express error handler caught error in dataController.getOne',
        status: 500,
        message: { err: 'Failed to fetch one' },
      });
    }
  },
  // Received passed in endpoint and runs get request
  getUrlResponse: async (req, res, next) => {
    const { url } = req.body;
    try {
      const request = await fetch(url);
      const data = await request.json();
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
};

module.exports = dataController;
