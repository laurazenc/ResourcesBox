(function() {
  'use strict';

  angular
    .module('app')
    .factory('firebaseAuthService', firebaseAuthService);

    firebaseAuthService.$inject = ['$q', 'firebaseDataService'];
    function firebaseAuthService ($q, firebaseDataService) {
      return {
        checkUser   : checkUser,
        handleAuth  : handleAuth,
        handleLogout: handleLogout
      };

      function checkUser () {
        return $q(function (resolve, reject) {
          firebase.auth().onAuthStateChanged(function (user) {
            if (user != null) {
              resolve({user: user.providerData[0]});
            } else {
              reject({user: null});
            }
          });
        });
      }

      function handleAuth (choice) {
        var provider = getProvider(choice);

        return $q(function (resolve, reject) {
          firebase.auth().signInWithPopup(provider)
          .then(function (result) {
            var providerData = result.user.providerData[0];
            firebaseDataService.users.child(providerData.uid).set({
              name: providerData.displayName,
              email: providerData.email
            });
            resolve({user: result.user});
          })
          .catch(function (error) {
            reject('Error ' + error.code + ':' + error.message);
          });
        });
      }

      function handleLogout () {
        return $q(function (resolve, reject) {
          firebase.auth().signOut()
          .then(function (result) {
            resolve();
          })
          .catch(function (error) {
            reject('Error ' + error.code + ':' + error.message);
          });
        });
      }

      function getProvider(choice) {
        var provider;
        if (choice === 'google') {
          provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/plus.login');
        }else if(choice === 'github') {
          provider = new firebase.auth.GithubAuthProvider();
          provider.addScope('repo');
        }else if(choice === 'twitter') {
          provider = new firebase.auth.TwitterAuthProvider();
        }

        return provider;
      }
    }

}());
