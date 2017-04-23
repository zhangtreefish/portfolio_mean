var mongodb = require('mongodb');
var fs = require('fs');

//var dburi = require('./dburi');
var dburi = process.env.MONGODB_URI;

module.exports = function(callback) {
  mongodb.MongoClient.connect(dburi, callback);
};
