var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  var options = { promiseLibrary: require('bluebird') };

  mongoose.connect(process.env.MONGOLAB_BRONZE_URI, options);

  wagner.factory('goose_for_db', function() {
    return mongoose;
  });
  var User = mongoose.model('User', require('./user'), 'users');
  var models = {
    User: User
  };
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });
  wagner.factory('Project', require('./project'));

  return models;
};
