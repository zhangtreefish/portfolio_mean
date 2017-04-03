let mongoose = require('mongoose');
let _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://ztf:X2d4jx@cluster0-shard-00-00-of9bu.mongodb.net:27017,cluster0-shard-00-01-of9bu.mongodb.net:27017,cluster0-shard-00-02-of9bu.mongodb.net:27017/portfolio?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
  //If using local db: mongoose.connect('mongodb://localhost:27017/portfolio');

  wagner.factory('goose_for_db', function() {
    return mongoose;
  });
  let User = mongoose.model('User', require('./user'), 'users');
  let models = {
    User: User
  };
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });
  wagner.factory('Project', require('./project'));

  //wagner.factory('User', User);

  return models;
};
