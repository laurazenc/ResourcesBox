(function(){
  'use strict';

  angular
  .module('app', [
    'app.config',
  ])
  .run(run)
  .config(config) ;


  run.$inject = ['$rootScope', 'FBURL', 'firebaseAuthService', 'firebaseDataService']

  function run($rootScope, FBURL, firebaseAuthService, firebaseDataService) {
    // if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
    //   // double-check that the app has been configured
    //   angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
    //   setTimeout(function() {
    //     angular.element(document.body).removeClass('hide');
    //   }, 250);
    // }
    // else {
    //   $rootScope.FBURL = FBURL;
    // }


    firebaseAuthService.checkUser().then(function(data) {
        $rootScope.user = data.user;
        console.log($rootScope.user);
    });

  }

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: './views/dashboard.html',
        constroller: 'DashboardController'
      })
      .when('/register', {
        templateUrl: './views/register.html',
        constroller: 'RegisterController'
      })
      .when('/addList', {
        templateUrl: './views/addList.html',
        constroller: 'ListController'
      })
      .when('/list/:id', {
        templateUrl: './views/listDetail.html',
        constroller: 'DetailController'
      });

    $locationProvider.html5Mode(true);

  }



})();
