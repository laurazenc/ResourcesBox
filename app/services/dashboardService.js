(function () {
  'use strict';

  angular
    .module('app')
    .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http'];

  function DashboardService ($http) {

  }
})();
