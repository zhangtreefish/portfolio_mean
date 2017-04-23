var mongodb = require('mongodb');
var fs = require('fs');

var dburi = require('./dburi');

module.exports = function(callback) {
  mongodb.MongoClient.connect(dburi, callback);
};
