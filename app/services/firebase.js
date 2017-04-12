(function () {
  'use strict';

  angular
    .module('app')
    .factory('firebaseDataService', firebaseDataService);


  function firebaseDataService () {
    firebase.initializeApp({
      apiKey            : 'AIzaSyBT2bk3MzVlU2sK3nEdF5mFiO_0Sc0U7YQ',
      authDomain        : 'sharing-resources.firebaseapp.com',
      databaseURL       : 'https://sharing-resources.firebaseio.com',
      storageBucket     : 'sharing-resources.appspot.com',
      messagingSenderId : '775224080427'
    });
    var root = firebase.database().ref();

    var service = {
      root     : root,
      users    : root.child('users'),
      lists    : root.child('lists'),
      resources: root.child('resources'),
      tags     : root.child('tags'),
      fb       : firebase
    };
    return service;
  }  

})();
