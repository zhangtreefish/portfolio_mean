var assert = require('assert');

describe('Portfolio Page app', function() {
	it('should wait for 3 seconds', function() {
		browser.pause(3000);
	});
    it('should have a title', function() {
        browser.url('/');
        // browser.waitForValue('title', 3000);
        var title = browser.getTitle();
        assert.equal(title, 'Portfolio Site');
    });
});
