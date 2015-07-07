'use strict';
var rdk = require('../../rdk/rdk');
var _ = rdk.utils.underscore;
var errors = require('../common/errors');


function getData(req, pid, refferenceDate, callback) {
    var config = req.app.config;
    var jdsPath = '/vpr/' + pid + '/index/procedure?filter=ne(removed,true),in(kind,["Radiology","Surgery","Procedure","Imaging","Consult"])';
    var options = _.extend({}, config.jdsServer, {
        path: jdsPath,
        method: 'GET'
    });
    var httpConfig = {
        protocol: 'http',
        timeoutMillis: 120000,
        logger: req.logger,
        options: options
    };

    rdk.utils.http.fetch(httpConfig, function(error, result) {
        req.logger.debug('callback from fetch()');
        if (error) {
            return callback(new errors.FetchError('Error fetching pid=' + pid + ' - ' + (error.message || error), error));
        } else {
            var obj = JSON.parse(result);
            if ('data' in obj) {
                return callback(null, buildResult(obj.data.items));
            } else if ('error' in obj) {
                if (errors.isNotFound(obj)) {
                    return callback(new errors.NotFoundError('Object not found', obj));
                }
            }

            return callback(new Error('There was an error processing your request. The error has been logged.'));
        }
    });
}


function buildResult(result) {
    var res = {};
    res.procedure = result;
    return res;
}

module.exports.getData = getData;
