/* 
module: tracking.js
description: module that allows to track shipments via express connect webservices of tnt
*/

var request = require('superagent'); // require superagent module

function Tracking (opts) {
    //handling the default options if they do not exists raise an erro
    if (!opts.userid) {throw new Error('Userid value is missing, please pass a userid in the options.');}
    if (!opts.password) {throw new Error('Password value is missing, please pass a password in the options');}    

    //fill the instance properties
    this.userid = opts.userid;
    this.password = opts.password;
}

Tracking.prototype.trackByXML = function (xmlString, callback) {
    var authenticationString = new Buffer(this.userid + ':' + this.password).toString('base64'); // base64 encode the userid and password
    var serviceResponse = new Object(); // define the empty response object
    request
        .post('https://express.tnt.com/expressconnect/track.do')
        .send('xml_in=' + xmlString)
        .set('Authorization', 'Basic ' + authenticationString)
        .end(function (err, res) {
            if (err) {return callback(err);} // check if error occured if so return callback with error object
            if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
            serviceResponse.rawResponse = res; // add the response object to the rawResponse property
            serviceResponse.xml = res.text // add the original xml response string to the xml property
            callback(null, serviceResponse) //call callback and return response object
        });
};  

module.exports = Tracking;