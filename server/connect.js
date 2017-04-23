var mongodb = require('mongodb');
var fs = require('fs');

var dburi = process.env.MONGODB_URI;

module.exports = function(callback) {
  mongodb.MongoClient.connect(dburi, callback);
};
