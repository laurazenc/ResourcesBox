(function () {
  'use strict';

  angular
    .module('app')
    .service('RegisterService', RegisterService)

  RegisterService.$inject = ['$log', '$window', '$interval', '$rootScope'];

  function RegisterService($log, $window, $interval, $rootScope) {

    var service = {

    };

    return service;
  };

})();
