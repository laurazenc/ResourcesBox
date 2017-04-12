(function() {
  'use strict';
  angular
    .module('app')
    .factory('UserService', UserService);

  UserService.$inject = ['firebaseDataService', '$firebaseObject', '$q'];

  function UserService(firebaseDataService, $firebaseObject, $q) {

    var ref = firebaseDataService.users;
    return {
      getUserData: getUserData      
    }

    function getUserData(uid) {
      var user = $firebaseObject(ref.child(uid));
      return user;
    }

  }

}());
