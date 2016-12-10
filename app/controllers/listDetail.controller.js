(function() {
  'use strict';

  angular
    .module('app')
    .controller('DetailController', DetailController);

  DetailController.$inject = ['$scope', '$routeParams', 'ListService'];

  function DetailController($scope, $routeParams, ListService) {
    $scope.id = $routeParams.id;

    $scope.list = ListService.getList($scope.id);
    console.log($scope.list);

  }
}());
