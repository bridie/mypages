var myPages = angular.module('myPages', []);

myPages.controller('addPageController', ['$scope', '$http', function($scope, $http) {

  $scope.formData = {};

  $scope.addPage = function() {

    $http.post('/api/pages', $scope.formData)
      .success(function(data) {
        console.log(data);
        // Clear the form so the user is ready to add another page.
        $scope.formData = {};
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  }
  
}]);
