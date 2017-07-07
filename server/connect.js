var mongodb = require('mongodb');
var fs = require('fs');

module.exports = function(callback) {
  mongodb.MongoClient.connect(process.env.MONGOLAB_BRONZE_URI, callback);
};
