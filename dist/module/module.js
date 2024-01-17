// this is an experimental feature if we were to deploy via NPM
var listAllEndpoints = require('express-list-endpoints');
module.exports = {
    exportGetEndpoints: function (app) {
        var allEndpoints = listAllEndpoints(app);
        var paths = [];
        allEndpoints.forEach(function (endpoint) {
            if (endpoint.methods.includes('GET') && endpoint.path !== '*')
                paths.push(endpoint.path);
        });
    },
};
//# sourceMappingURL=module.js.map