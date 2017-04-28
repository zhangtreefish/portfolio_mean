var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
webdriverio
    .remote(options)
    .init()
    .url('https://portfolio-mean.herokuapp.com/portfolio/')
    .getTitle().then(function(title) {
        console.log('Title was: ' + title);
    })
    .end();