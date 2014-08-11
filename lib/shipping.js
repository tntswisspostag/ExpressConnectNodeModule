/* 
module: shipping.js
description: module that allows to ship parcels via express connect webservices of tnt
*/

var request = require('superagent'); // require superagent module

function Shipping () {
    //fill the instance properties
    this.url = 'https://iconnection.tnt.com/shippergate2.asp';
}

Shipping.prototype.shipByXML = function (xmlString, callback) {
    var serviceResponse = new Object(); // define the empty response object
    request
    .post(this.url)
    .send('xml_in=' + xmlString)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        if (err) {return callback(err);} // check if error occured if so return callback with error object
        if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
        serviceResponse.rawResponse = res; // add the response object to the rawResponse property
        serviceResponse.text = res.text; // add the original xml response string to the xml property
        var responseSplit = res.text.split(':'); // split the answer string to be able to fill below properties
        serviceResponse.requestAccessCode = responseSplit[1];
        serviceResponse.requestStatus = responseSplit[0];
        callback(null, serviceResponse); //call callback and return response object
    });
};

//function that returns the result of the first request
Shipping.prototype.getResult = function (accessCode, callback) {
    var serviceResponse = new Object(); //define the empty response object
    request
    .post(this.url)
    .send('xml_in=GET_RESULT:' + accessCode)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        if (err) {return callback(err);} // check if error occured if so return callback with error object
        if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
        serviceResponse.rawResponse = res; // add the response object to the rawResponse property
        serviceResponse.xml = res.text; // add the original xml response string to the xml property
        callback(null, serviceResponse); //call callback and return response object
    });
};

//function that returns the xml to produce a consignment
Shipping.prototype.getConnote = function (accessCode, callback) {
    var serviceResponse = new Object(); //define the empty response object
    request
    .post(this.url)
    .send('xml_in=GET_CONNOTE:' + accessCode)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        if (err) {return callback(err);} // check if error occured if so return callback with error object
        if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
        serviceResponse.rawResponse = res; // add the response object to the rawResponse property
        serviceResponse.xml = res.text; // add the original xml response string to the xml property
        callback(null, serviceResponse); //call callback and return response object
    });
};

//function that returns the xml to produce an address label
Shipping.prototype.getLabel = function (accessCode, callback) {
    var serviceResponse = new Object(); //define the empty respons object
    request
    .post(this.url)
    .send('xml_in=GET_LABEL:' + accessCode)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        if (err) {return callback(err);} // check if error occured if so return callback with error object
        if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
        serviceResponse.rawResponse = res; // add the response object to the rawResponse property
        serviceResponse.xml = res.text; // add the original xml response string to the xml property
        callback(null, serviceResponse); //call callback and return response object
    });
};

//function that returns the xml to prouduce an invoice
Shipping.prototype.getInvoice = function (accessCode, callback) {
    var serviceResponse = new Object(); //define the empty respons object
    request
    .post(this.url)
    .send('xml_in=GET_INVOICE:' + accessCode)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        if (err) {return callback(err);} // check if error occured if so return callback with error object
        if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
        serviceResponse.rawResponse = res; // add the response object to the rawResponse property
        serviceResponse.xml = res.text; // add the original xml response string to the xml property
        callback(null, serviceResponse); //call callback and return response object
    });
};

//function that returns the xml to produce a manifest
Shipping.prototype.getManifest = function (accessCode, callback) {
    var serviceResponse = new Object(); //define the empty respons object
    request
    .post(this.url)
    .send('xml_in=GET_MANIFEST:' + accessCode)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
        if (err) {return callback(err);} // check if error occured if so return callback with error object
        if (!res.ok) {return callback(res.error);} // check if status was not ok if so return callback with response error
        serviceResponse.rawResponse = res; // add the response object to the rawResponse property
        serviceResponse.xml = res.text; // add the original xml response string to the xml property
        callback(null, serviceResponse); //call callback and return response object
    });
};

module.exports = Shipping;