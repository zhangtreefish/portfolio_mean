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
        expect(url).to.include('//portfolio/#/', 'url mismatch');
    });
});

describe('#pickTool', function() {
	it('should have a height', function() {
		var height = browser.getCssProperty('#pickTool', 'height');
		expect(height.parsed.value).to.be.at.least(0, "#pickTool height not >= 0!");
	});
	//TODO:
	// it('should go to whatever is picked', function() {
	// 	browser.setValue('#pickTool', 'javascript');
	// 	browser.click('#pickTool');
	// 	var tools = browser.getValue('#main > div > div > tool-projects-two > div');
 //        console.log(tools);
 //        //expect(url).to.include('//portfolio/#/', 'url mismatch');
	// })
})