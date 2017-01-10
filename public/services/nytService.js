angular.module('sentimentNews').service('nytService', function() {

  var _articles = [];

  this.setArticles = function (items) {
    _articles = items;
  }

  this.getArticles = function () {
    return _articles;
  }


});