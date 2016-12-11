(function() {
  'use strict';

  angular
    .module('app')
    .factory('firebaseDataService', firebaseDataService)
    .factory('firebaseAuthService', firebaseAuthService);

  function firebaseDataService() {
      firebase.initializeApp({
        apiKey: "AIzaSyBT2bk3MzVlU2sK3nEdF5mFiO_0Sc0U7YQ",
        authDomain: "sharing-resources.firebaseapp.com",
        databaseURL: "https://sharing-resources.firebaseio.com",
        storageBucket: "sharing-resources.appspot.com",
        messagingSenderId: "775224080427"
      });
    var root = firebase.database().ref();


    var service = {
      root: root,
      users: root.child('users'),
      lists: root.child('lists'),
      resources: root.child('resources')
    };
    return service;
  }
  firebaseAuthService.$inject = ['$q'];

  function firebaseAuthService($q) {
    return {
      checkUser: checkUser,
      handleAuth: handleAuth,
      handleLogout: handleLogout
    }

    function checkUser() {
      return $q(function(resolve, reject) {
        firebase.auth().onAuthStateChanged(function(user){
          if(user){
            resolve({user: user.providerData[0]});
          }else{
            reject();
          }
        });
      });

    }

    function handleAuth () {
      return $q(function(resolve, reject) {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/plus.login')

        firebase.auth().signInWithPopup(provider)
        .then(function(result){
          resolve({user: result.user});
          console.log(result.user.email + ' ha iniciado sesión');
        })
        .catch(function(error){
          reject('Error '+error.code+':'+error.message);
        });
      });
    }

    function handleLogout () {
      return $q(function(resolve, reject) {
        firebase.auth().signOut()
        .then(function(result){
          resolve();
          console.log('Te has desconectado correctamente');
        })
        .catch(function(error){
          reject('Error '+error.code+':'+error.message);
        });
      });
    }
  }
})();
