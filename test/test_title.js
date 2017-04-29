var assert = require('assert');

describe('Portfolio Page app', function() {
	it('should wait for 3 seconds', function() {
		browser.pause(3000);
	});
    it('should have a title', function() {
        browser.url('/');
        var title = browser.getTitle();
        // assert.equal(title, 'Portfolio Site');
        console.log('title', title);
    });
    it('should have a url', function() {
        browser.url('/');
        var url = browser.getUrl();
        // assert.equal(url, baseUrl);
        console.log('url', url);
    });
});
