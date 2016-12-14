(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', 'FBURL', '$location', '$firebaseObject', '$firebaseArray', 'firebase'];

  function RegisterController ($scope, FBURL, $location, $firebaseObject, $firebaseArray, firebase) {
    var ref = firebase.database().ref().child('users');
    // download the data into a local object
    $scope.users = $firebaseArray(ref);

    // Bind the todos to the firebase provider.
    $scope.createNewUser = function () {
      var user = {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      };
      $scope.users.$add(user)
      .then(function (data) {
        // data has been saved to our database
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  }
})();
