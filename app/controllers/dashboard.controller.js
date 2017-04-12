(function () {
  'use strict';

  angular.module('app').controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'ListService', 'GetResourceService', 'ResourceService', 'TagService', 'UserService'];
  function DashboardController ($scope, ListService, GetResourceService, ResourceService, TagService, UserService) {

    $scope.lists        = [{}, {}, {}];
    $scope.hoverIn      = hoverIn;
    $scope.hoverOut     = hoverOut;
    $scope.getTagsValue = getTagsValue;

    function hoverIn() {
      this.hoverEdit = true;
    };

    function hoverOut () {
      this.hoverEdit = false;
    };

    function getTagsValue(tags) {
      return TagService.getListTagsValue(tags);
    }

    ListService.getLists().$loaded().then(function (data) {
      $scope.lists = data;
      angular.forEach($scope.lists, function (value) {

        var d = new Date(value.created_at);
        var tags = (value.tags) ? getTagsValue((value.tags).split(',')) : [];
        value.createdAt     = (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear());
        value.tagList       = tags;
        value.resources     = ResourceService.getResourceByListId(value.$id);
      });
    });
  }

})();
