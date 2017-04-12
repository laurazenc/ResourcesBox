(function () {
  'use strict';

  angular
    .module('app')
    .service('AddResourceService', AddResourceService)
    .service('GetResourceService', GetResourceService)
    .service('ResourceService', ResourceService);

  AddResourceService.$inject = ['firebase', '$q', '$firebaseArray', '$window'];

  function AddResourceService (firebase, $q, $firebaseArray, $window) {
    var vm = this;
    var ref = firebase.database().ref().child('resources');
    var resources = $firebaseArray(ref);

    vm.addResource = addResource;

    function addResource (resource) {
      return $q(function (resolve, reject) {
        resource.created_at = firebase.database.ServerValue.TIMESTAMP;
        resources.$add(resource)
          .then(function (data) {
            resolve({'data': data});
          })
          .catch(function (error) {
            reject({'error': error});
          });
      });
    }
  }

  GetResourceService.$inject = ['firebaseDataService', '$q', '$firebaseArray'];

  function GetResourceService (firebaseDataService, $q, $firebaseArray) {
    var resources = $firebaseArray(firebaseDataService.resources);
    return resources;
  }

  ResourceService.$inject = ['firebaseDataService', '$q', '$firebaseArray', '$firebaseObject'];

  function ResourceService (firebaseDataService, $q, $firebaseArray, $firebaseObject) {
    return {
      getResourceByListId: getResourceByListId,
      deleteResource: deleteResource
    };

    function getResourceByListId (id) {
      var resources = firebaseDataService.resources;
      var ref = resources.orderByChild('list_id');
      var resources = $firebaseArray(ref);
      var res = [];
      resources.$loaded(function () {
        angular.forEach(resources, function (value) {
          if (angular.equals(value.listId, id)) {
            res.push(value);
          }
        });
      });
      return res;
    }

    function deleteResource(resource) {
      var resources = firebaseDataService.resources;
      var toDelete = $firebaseObject(resources.child(resource.$id));
      console.log(toDelete);
      // var obj = $firebaseObject(toDelete);
      // return obj.$remove();
      return $q(function (resolve, reject) {
        toDelete.$remove()
          .then(function (data) {
            resolve({'data': data});
          })
          .catch(function (error) {
            reject({'error': error});
          });
      });
    }
  }
}());
