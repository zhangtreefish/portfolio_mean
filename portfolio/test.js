describe('Nav Bar', function() {
  var injector;
  var element;
  var scope;
  var intercepts;
  var httpBackend;

  beforeEach(function() {
    injector = angular.injector(['myApp.components', 'ngMockE2E']);
    intercepts = {};

    injector.invoke(function($rootScope, $compile, $httpBackend) {
      scope = $rootScope.$new();

      $httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
      httpBackend = $httpBackend;

      element = $compile('<nav-bar></nav-bar>')(scope);
      scope.$apply();
    });
  });

  it('shows logged in users profile picture', function(done) {
    httpBackend.expectGET('/api/v1/me').respond({
      user: { profile: { picture: 'myPic' } }
    });

    scope.$on('NavBarController', function() {
      assert.equal(element.find('.title').text().trim(), 'Portfolio Builder');

      httpBackend.flush();
      assert.notEqual(element.find('.user-info .user').css('display'), 'none');
      assert.equal(element.find('.user-info .user img').attr('src'), 'myPic');
      done();
    });
  });
});

// describe('Project Details', function() {
//   var injector;
//   var element;
//   var scope;
//   var intercepts;
//   var httpBackend;

//   beforeEach(function() {
//     injector = angular.injector(['myApp.components', 'ngMockE2E', 'myApp', 'ngRoute']);
//     intercepts = {};

//     injector.invoke(function($rootScope, $compile, $httpBackend, $ngRoute) {
//       scope = $rootScope.$new();

//       $httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
//       httpBackend = $httpBackend;

//       element = $compile('<project-details></project-details>')(scope);
//       scope.$apply();
//     });
//   });

//   it('fetches project of certain id', function(done) {
//     httpBackend.expectGET('/api/v1/project/id/:id').respond({
//       project: { id: "1000", title: "under the fig tree", "year_start": 2017, description: "watch clouds" }
//     });

//     scope.$on('NavBarController', function() {
//       httpBackend.flush();
//       assert.notEqual(element.find('.details-right h1').text().trim(), 'under the fig tree');
//       done();
//     });
//   });
// });

