(function() {
  'use strict';
  angular
    .module('app')
    .factory('UserService', UserService);

  UserService.$inject = ['firebaseDataService', '$firebaseArray'];

  function UserService(firebaseDataService, $firebaseArray) {
    return {
      getUserData: getUserData
    }

    function getUserData(uid) {
      $firebaseArray(firebaseDataService.users.child(uid)).$loaded()
        .then(function(data) {
          console.log(data[1].$value);
        })
        .catch(function(err) {
          console.log('Error ', err);
        });
    }
  }

}());
