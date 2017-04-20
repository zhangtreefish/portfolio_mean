var fs = require('fs');

module.exports = function(wagner) {
  var Config_func = wagner.factory('Config', function() {
    return JSON.parse(fs.readFileSync('./server/config.json').toString());
  });

  return {Config: Config_func};
};
