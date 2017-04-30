before(function(){
        browser.url('/portfolio/');
	})

describe('Portfolio Page app', function() {
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
        expect(url).to.include('/portfolio/#/', 'url mismatch');
    });
});

describe('About anchor', function() {
	it('should exist', function() {
		var isExisting = $('#about').isExisting();
		expect(isExisting, 'About anchor present.').to.be.true;
	});
	it('should go to About url on click', function() {
		$('#about').click();
		var about_url = browser.getUrl();
		expect(about_url).to.include('/portfolio/#/about', 'Link to About broken!');
	})
})