describe('Portfolio Page app', function() {
    it('has a title', function(){
        return browser
        .url('/portfolio/')
        .getTitle().then(function(title) {
            console.log('Title was: ' + title);
        })
    .end();
    })
})
