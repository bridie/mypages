var myPages = angular.module('myPages', []);

myPages.controller('addPageController', ['$http', function($http) {

  var self = this;

  self.formData = {};

  self.addPage = function() {

    $http.post('/api/pages', self.formData)
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
