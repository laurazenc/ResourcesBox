(function () {
  'use strict';

  angular
    .module('app')
    .controller('DetailController', DetailController);

  DetailController.$inject = ['$scope', '$routeParams', '$rootScope', 'ListService', 'ResourceService', 'UserService', 'ngDialog', 'notifications', '$location'];

  function DetailController ($scope, $routeParams, $rootScope, ListService, ResourceService, UserService, ngDialog, notifications, $location) {
    $scope.id         = $routeParams.id;
    $scope.isCreator  = false;
    init              = init;
    $scope.deleteList = deleteList;
    $scope.deleteModal = deleteModal;
    $scope.editList = editList;

    init();

    function init() {
      ListService.getList($scope.id)
        .$loaded()
        .then(function (data) {
          $scope.list = data;
          var d = new Date($scope.list.created_at);
          $scope.createdAt = (d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear());
          $scope.createdBy = UserService.getUserData($scope.list.createdBy);
          $scope.resources = ResourceService.getResourceByListId($scope.list.$id);
          $scope.isCreator = checkIsCreator();
        })
        .catch(function () {
          notifications.showError({message: 'Something went wrong!'});
        });
    }

    function checkIsCreator() {
      return $rootScope.user.uid == $scope.list.createdBy;
    }

    function deleteModal() {
      ngDialog
      .open({ template: 'deleteList', className: 'ngdialog-theme-default', scope: $scope })
    }
    function deleteList(list) {
      ListService
        .deleteList(list)
        .then(function() {
          angular.forEach($scope.resources, function(resource) {
            console.log(resource);
            ResourceService
            .deleteResource(resource)
            .then(function() {
              console.log('resource deleted');
            })
            .catch(function() {
              notifications.showError({message: 'Something went worng!'});
            })
          });
          notifications.showSuccess({message: 'List posted successfully!'});
          $location.path('/');
        })
        .catch(function() {
          notifications.showError({message: 'Something went worng!'});
        })


      ngDialog.closeAll();

    }

    function editList() {

    }


  }
}());
