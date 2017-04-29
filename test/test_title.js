var assert = require('assert');

describe('Portfolio Page app', function() {
	it('should wait for 3 seconds', function() {
		browser.pause(3000);
	});
    it('should have a title', function() {
        browser.url('/');
        var title = browser.getTitle();
        assert.equal(title, 'Portfolio Site');
    });
    it('should have a url', function() {
        browser.url('/');
        var url = browser.getUrl();
        assert.equal(url, 'http://127.0.0.1:3003/portfolio//#/');
    });
});
