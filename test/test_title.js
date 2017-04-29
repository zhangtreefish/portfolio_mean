var assert = require('assert');

describe('Portfolio Page app', function() {
	before(function(){
        browser.url('/portfolio/');
	})

	it('should wait for 3 seconds', function() {
		browser.pause(3000);
		console.log('I waited');
	});

    it('should have a title', function() {
        var title = browser.getTitle();
        assert.equal(title, 'Portfolio Site');
    });

    it('should have a url', function() {
        var url = browser.getUrl();
        var containsUrl = url.includes('//portfolio/#/');
        assert.ok(containsUrl);
    });
});
