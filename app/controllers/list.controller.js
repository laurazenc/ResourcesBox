(function() {
    'use strict';

    angular
      .module('app')
      .controller('AddListController', AddListController);

    AddListController.$inject = ['$scope', 'ListService', 'AddResourceService'];

    function AddListController($scope, ListService, AddResourceService) {

        $scope.remove = remove;
        $scope.addResource = addResource;
        $scope.addList = addList;

        $scope.resources = [];

        $scope.data = {
            availableOptions: [ { id: '1', name: 'Design' }, { id: '2', name: 'Development' }, { id: '3', name: 'Tutorial' }, { id: '4', name: 'Other' } ],
            selectedOption: {
                id: '1',
                name: 'Design'
            }
        };

        function remove(i) {
            $scope.resources.splice(i, 1);
        }

        function addResource() {
            if ($scope.resourcename != ''  && $scope.reourcelink != '') {
                $scope.resources.push({
                  'name': $scope.resourcename,
                  'description': $scope.resourcedescription != undefined ? $scope.resourcedescription : '',
                  'link': $scope.reourcelink
                });
                console.log($scope.resources);
                $scope.resourcename = null;
                $scope.resourcedescription = null;
                $scope.reourcelink = null;
            }
        }

        function addList() {
            if ($scope.listname != undefined) {
                if ($scope.resources.length != 0) {
                    // Create list
                   ListService.addList({
                      'name': $scope.listname,
                      'category': $scope.data.selectedOption.name
                    }).then(function(data) {
                        var listId = data.data.path.o[1];
                        angular.forEach($scope.resources, function(resource, key) {
                            AddResourceService.addResource({
                              'listId': listId,
                              'name': resource.name,
                              'description': resource.description,
                              'link': resource.link
                            }).then(function(data) {
                                console.log(data);
                            }).catch(function(error) {
                                console.log(error);
                            });

                        });
                    });
                } else {
                    $scope.errors = "List should have at least one resource added"
                }
            } else {
                $scope.errors = "List should have a name"
            }
        }

    }

}());
