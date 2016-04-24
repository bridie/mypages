var myPages = angular.module('myPages', []);

myPages.controller('addPageController', ['$http', function(http) {

  var self = this;

  self.formData = {};

  self.addPage = function() {

    http.post('/api/pages', self.formData)
      .success(function(data) {
        console.log(data);
        // Clear the form so the user is ready to add another page.
        self.formData = {};
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  }
  
}]);

myPages.controller('groupsController', ['$scope', '$element', '$compile', '$http', function(scope, element, compile, http) {

  var self = this;

  self.getGroups = function() {
    http.get('/api/groups')
      .success(function(data) {
        self.renderGroups(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  self.renderGroups = function(groups) {

    angular.forEach(groups, function(group) {
      var directiveScope = angular.extend(scope, { 'name': group.name, 'pages': group.pages });
      var directive = compile('<group></group>')(scope);
      element.append(directive);
    });

  }

  self.getGroups();

}]);

myPages.directive('group', function() {
  return {
    scope: true,
    restrict: 'E',
    replace: true,
    templateUrl: 'views/group.html'
  }
});
