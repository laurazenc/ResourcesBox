(function () {
  'use strict';

  angular
    .module('app.config', [
      'firebase',
      'ngRoute',
      'textAngular',
      'wu.masonry'
    ])
    .constant('FBURL', 'https://sharing-resources.firebaseio.com/sharing-resources');
})();
