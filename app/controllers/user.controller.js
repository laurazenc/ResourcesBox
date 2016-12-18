(function () {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$rootScope', 'firebaseAuthService', 'RegisterService', '$location'];

  function UserController ($scope, $rootScope, firebaseAuthService, RegisterService, $location) {
    var vm = this;
    vm.user = $rootScope.user;
    init();
    $scope.login = login;
    $scope.logOut = logOut;


    $rootScope.$watch($rootScope.user, function () {
      firebaseAuthService.checkUser().then(function (data) {
        $rootScope.user = data.user;
        vm.user = $rootScope.user;
      });
    });

    $rootScope.$on('$routeChangeStart', function () {
      init();
    });

    function init () {
      firebaseAuthService.checkUser().then(function (data) {
        $rootScope.user = data.user;
        vm.user = $rootScope.user;
      });
    }

    function login(provider) {
      firebaseAuthService.handleAuth(provider)
      .then(function (data) {
        $rootScope.user = data.user;
        console.log(data.user.photoURL);
        vm.user = $rootScope.user;
        $location.path('/');
      })
      .catch(function(error) {
        console.log('Error ', error);
      });
    };

    function logOut() {
      firebaseAuthService.handleLogout().then(function (data) {
        $rootScope.user = undefined;
        vm.user = $rootScope.user;
      });
    };
  }
}());
