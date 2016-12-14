(function () {
  'use strict';

  angular
    .module('app')
    .controller('DetailController', DetailController);

  DetailController.$inject = ['$scope', '$routeParams', 'ListService', 'ResourceService'];

  function DetailController ($scope, $routeParams, ListService, ResourceService) {
    $scope.id = $routeParams.id;

    ListService.getList($scope.id)
      .then(function (data) {
        $scope.list = data.data;
        $scope.resources = ResourceService.getResourceByListId($scope.list.$id);
      })
      .catch(function () {
        console.log('Something went wrong!');
      });
  }
}());
