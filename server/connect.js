var mongodb = require('mongodb');
var uri = 'mongodb://jsy:s4jku@cluster0-shard-00-00-of9bu.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

module.exports = function(callback) {
  mongodb.MongoClient.connect(uri, callback);
};
