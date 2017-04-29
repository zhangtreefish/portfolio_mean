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
    .setValue('.pickTool', 'javascript')
    .click('.pickTool #pickTool')
    .getTitle().then(function(title) {
        console.log('Title was: '+ title);
    })
    .getUrl().then(function(url) {
        console.log('Url is: ' + url);
    })
    .end();