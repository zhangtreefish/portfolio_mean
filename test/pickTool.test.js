before(function(){
        browser.url('/portfolio/');
	})

describe('#pickTool', function() {
	it('should have a height', function() {
		var height = browser.getCssProperty('#pickTool', 'height');
		expect(height.parsed.value).to.be.at.least(0, "#pickTool height not >= 0!");
	});

	it('should be able to select ajax as the second ng-option', function() {
		var ele = $('#pickTool > option:nth-child(2)');
		expect(ele.isSelected()).to.be.false;
	    expect(ele.getText()).to.equal('ajax');
	    expect(ele.isExisting()).to.be.true;
		ele.click();
	    expect(ele.isSelected()).to.be.true;
	})
})