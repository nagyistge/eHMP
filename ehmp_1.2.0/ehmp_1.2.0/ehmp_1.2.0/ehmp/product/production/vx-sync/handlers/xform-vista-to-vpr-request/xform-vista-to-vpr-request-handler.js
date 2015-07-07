/*jslint node: true */
'use strict';

var log = require(global.VX_UTILS + 'log').get('xform-vista-to-vpr-request-handler', 'handler');

function handle(environment, payload, handlerCallback) {
    log.debug('xform-vista-to-vpr-request-handler.handle : transform record');
    var job = createJob(payload);
    environment.publisherRouter.publish(job.type, job.payload, job.options, function(err) {
        if (err) {
            log.warn('xform-vista-to-vpr-request-handler.handle : failed to publish message [%s]', err);
            handlerCallback('transient-exception', err);
        } else {
            log.debug('xform-vista-to-vpr-request-handler.handle : successfully transformed and published message');
            handlerCallback('success');
        }
    });

    function createJob(payload) {
        return {
            type: 'record-enrichment-request',
            payload: payload,
            publishOptions: {}
        };
    }
}

module.exports = handle;