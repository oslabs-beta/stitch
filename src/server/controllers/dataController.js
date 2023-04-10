


// const stateController = {
//   setGitHubUser: async (req, res, next) => {
//     try {
//       const request = await fetch('https://swapi.dev/api/people/1/');
//       const data = await request.json();
//       res.locals.data = data;
//       return next();
//     } catch {
//       return next({
//         log: 'Express error handler caught error in dataController.getOne',
//         status: 500,
//         message: { err: 'Failed to fetch one' },
//       });
//     }
//   }
// };

// module.exports = stateController;
