var myPages = angular.module('myPages', []);

myPages.controller('addPageController', ['$http', function(http) {

  var self = this;

  self.formData = {};

  self.addPage = function() {

    return http.post('/api/pages', self.formData)
      .then(function(response) {
        // Clear the form so the user is ready to add another page.
        self.formData = {};
      });

  }
  
}]);

myPages.controller('groupsController', ['$scope', '$element', '$compile', '$http', function(scope, element, compile, http) {

  var self = this;
  self.groups = {};

  self.getGroups = function() {

    return http.get('/api/groups')
      .then(function(response) {
        self.groups = response.data;
      });
  }

  self.renderGroups = function() {

    angular.forEach(self.groups, function(group) {
      var directiveScope = angular.extend(scope, { 'name': group.name, 'pages': group.pages });
      var directive = compile('<group></group>')(scope);
      element.append(directive);
    });

  }

  self.getGroups().then(self.renderGroups);

}]);

myPages.directive('group', function() {
  return {
    scope: true,
    restrict: 'E',
    replace: true,
    templateUrl: 'views/group.html'
  }
});
