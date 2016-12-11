(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController)

  UserController.$inject = ['$rootScope', 'firebaseAuthService'];

  function UserController($rootScope, firebaseAuthService) {
    var vm = this;
    vm.user = $rootScope.user;
    init();
    $rootScope.$watch($rootScope.user, function () {
      firebaseAuthService.checkUser().then(function(data){
        $rootScope.user = data.user;
        vm.user = $rootScope.user;
      });
    });

    $rootScope.$on('$routeChangeStart', function (){
			init();
		});

		function init(){
      firebaseAuthService.checkUser().then(function(data){
        $rootScope.user = data.user;
        vm.user = $rootScope.user;
      });
    }

    vm.login = function() {
      firebaseAuthService.handleAuth().then(function(data){
        $rootScope.user = data.user;
        vm.user = $rootScope.user;
      });
    }

    vm.logOut = function() {
      firebaseAuthService.handleLogout().then(function(data){
        $rootScope.user = undefined;
        vm.user = $rootScope.user;
      });
    }
  }
}());
