/* 
module: index.js
version: 0.1.0
description: index module that needs to be required witin the application. All create functions are listed here. They return the object that
is needed to call the services.

*/

var Lib1 = require('./lib/lib1');
var Tracking = require('./lib/tracking');
var Shipping = require('./lib/shipping');
var Labelling = require('./lib/labelling');
var Pricing = require('./lib/pricing');

module.exports.createLib1 = function (opts) {
    return new Lib1(opts);
};

module.exports.createTracking = function (opts) {
    return new Tracking(opts);
};

module.exports.createShipping = function () {
    return new Shipping();
};

module.exports.createLabelling = function (opts) {
    return new Labelling(opts);
};

module.exports.createPricing = function (opts) {
    return new Pricing(opts);
};