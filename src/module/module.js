// this is an experimental feature if we were to deploy via NPM

const listAllEndpoints = require('express-list-endpoints');
module.exports = {
  exportGetEndpoints: function (app) {
    const allEndpoints = listAllEndpoints(app);
    const paths = [];
    allEndpoints.forEach((endpoint) => {
      if (endpoint.methods.includes('GET') && endpoint.path !== '*')
        paths.push(endpoint.path);
    });
  },
};
