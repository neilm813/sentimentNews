angular.module('sentimentNews').controller('nytController', function ($scope, $http, nytService) {

  var lHost = 'http://localhost:3000';
  $scope.articles = [];
  $scope.test = 'test123';

  function getArticles() {
    $http.get(lHost + '/nyt/articles')
      .then(function (response) {
        nytService.setArticles(response.data);
        $scope.articles = nytService.getArticles();
        console.log($scope.articles);
      })
  }

  getArticles();

});