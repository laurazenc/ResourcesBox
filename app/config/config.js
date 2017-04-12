(function () {
  'use strict';

  angular
    .module('app.config', [
      'firebase',
      'ngRoute',
      'textAngular',
      'ngNotificationsBar',
      'ngSanitize',
      'ngDialog',
      'ngTagsInput'
    ])
    .constant('FBURL', 'https://sharing-resources.firebaseio.com/sharing-resources');

})();
