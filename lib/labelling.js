/* 
module: labelling.js
description: module that allows to track shipments via express connect webservices of tnt
*/

var request = require('superagent'); // require superagent module

function Labelling (opts) {
    if (!opts.userid) {throw new Error('Userid value is missing, please pass a userid in the options.');}
    if (!opts.password) {throw new Error('Password value is missing, please pass a password in the options');}    

    //fill the instance properties
    this.userid = opts.userid;
    this.password = opts.password;
}

//create a routing label by an xml string
Labelling.prototype.labelByXML = function (xmlString, callback) {
    var authenticationString = new Buffer(this.userid + ':' + this.password).toString('base64'); // base64 encode the userid and password
    var serviceResponse = new Object(); // define the empty response object

    console.log(authenticationString);


    request
        .post('https://express.tnt.com/expresslabel/documentation/getlabel')
        .send(xmlString)
        .set('Content-Type', 'text/xml')
        .set('Authorization', 'Basic ' + authenticationString)
        .end(function (err, res) {
            if (err) {return callback(err);} // check if error occured if so return callback with error object
            if (!res.ok) {return callback(res.error + '\n' + res.text);} // check if status was not ok if so return callback with response error
            serviceResponse.rawResponse = res; // add the response object to the rawResponse property
            serviceResponse.xml = res.text // add the original xml response string to the xml property
            callback(null, serviceResponse) //call callback and return response object 
    });
};

module.exports = Labelling;