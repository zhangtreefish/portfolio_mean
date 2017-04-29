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
        expect(title).to.equal('Portfolio Site');
    });

    it('should have a url', function() {
        var url = browser.getUrl();
        expect(url).to.include('//portfolio/#/', 'url mismatch');
    });
});
