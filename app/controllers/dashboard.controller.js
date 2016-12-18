(function () {
  'use strict';

  angular.module('app').controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'ListService', 'GetResourceService', 'ResourceService', 'UserService'];

  function DashboardController ($scope, ListService, GetResourceService, ResourceService, UserService) {
    $scope.hoverIn = function () {
      this.hoverEdit = true;
    };

    $scope.hoverOut = function () {
      this.hoverEdit = false;
    };

    ListService.getLists().$loaded().then(function (data) {
      $scope.lists = data;
      angular.forEach($scope.lists, function (value) {
        var d = new Date(value.created_at);
        value.createdAt = (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear());
        value.resources = ResourceService.getResourceByListId(value.$id);
      });
    });
  }
})();
