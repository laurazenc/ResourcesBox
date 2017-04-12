(function () {
  'use strict';

  angular.module('app', ['app.config'])
  .run(run)
  .config(config)
  .config(notificationsConfig);

  run.$inject = ['$rootScope', 'FBURL', 'firebaseAuthService', 'firebaseDataService'];

  function run ($rootScope, FBURL, firebaseAuthService, firebaseDataService) {
    firebaseAuthService.checkUser().then(function (data) {
      $rootScope.user = data.user;
      console.log();
    });
  }

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/dashboard.html',
      constroller: 'DashboardController'
    }).when('/register', {
      templateUrl: 'views/register.html',
      constroller: 'RegisterController'
    }).when('/login', {
      templateUrl: 'views/login.html',
      constroller: 'UserController'
    }).when('/addList', {
      templateUrl: 'views/addList.html',
      constroller: 'ListController'
    }).when('/list/:id', {
      templateUrl: 'views/listDetail.html',
      constroller: 'DetailController'
    }).otherwise({ redirectTo: '/' });
  }


  notificationsConfig.$inject = ['notificationsConfigProvider'];
  function notificationsConfig (notificationsConfigProvider) {
    // auto hide
    notificationsConfigProvider.setAutoHide(true);
    // delay before hide
    notificationsConfigProvider.setHideDelay(1500);
    // support HTML
    //notificationsConfigProvider.setAcceptHTML(false);
    // Set an animation for hiding the notification
    notificationsConfigProvider.setAutoHideAnimation('fadeOutNotifications');
    // delay between animation and removing the nofitication
    notificationsConfigProvider.setAutoHideAnimationDelay(1200);

  };
})();
