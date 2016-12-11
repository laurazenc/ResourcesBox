(function() {
    'use strict';

    angular.module('app').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'ListService', 'GetResourceService', 'ResourceService'];

    function DashboardController($scope, ListService, GetResourceService, ResourceService) {
        $scope.hoverIn = function(){
          this.hoverEdit = true;
        };

        $scope.hoverOut = function() {
          this.hoverEdit = false;
        };

        ListService.getLists().$loaded().then(function(data) {
            $scope.lists = data;

            angular.forEach($scope.lists, function(value) {
                value.resources = ResourceService.getResourceByListId(value.$id);
            });
        });
    }
})();
