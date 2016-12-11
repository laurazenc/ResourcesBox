(function() {
  'use strict';

  angular
    .module('app')
    .service('ListService', ListService)


  ListService.$inject = ['$firebaseArray', '$firebaseObject', '$q', 'firebaseDataService', '$location'];

  function ListService($firebaseArray, $firebaseObject, $q, firebaseDataService, $location) {
    return {
      getLists: getLists,
      getList: getList,
      addList: addList
    }

    if(firebaseDataService === undefined){
      firebaseDataService.init;
    }

    function getLists() {
      var ref = firebaseDataService.lists;
      var lists = $firebaseArray(ref);

      return lists;

    }

    function getList(id){
      var ref = firebaseDataService.lists;
      var data = $firebaseObject(ref.child(id));
      return $q(function(resolve, reject) {
          if(data){
            resolve({'data': data});
          }else{
            reject();
          }
      });
    }

    function addList(list) {
      var ref = firebaseDataService.lists;
      var lists = $firebaseArray(ref);
      return $q(function(resolve, reject) {
        list.created_at = firebase.database.ServerValue.TIMESTAMP;
        lists.$loaded(function() {
          lists.$add(list)
          .then(function(data) {
            resolve({'data': data});
            $location.path('/');
          })
          .catch(function(error){
            reject({'error': error});
          });

        });
      });
    }
  }

  // AddListService.$inject = ['$firebaseArray', '$q', 'firebaseDataService'];
  //
  // function AddListService( $firebaseArray, $q, firebaseDataService){
  //   var vm = this;
  //   if(firebaseDataService === undefined){
  //     firebaseDataService.init;
  //   }
  //   var ref = firebaseDataService.lists;
  //   var lists = $firebaseArray(ref);
  //
  //   vm.addList = addList;
  //
  //   function addList(list) {
  //
  //     return $q(function(resolve, reject) {
  //       lists.$add(list)
  //       .then(function(data) {
  //         resolve({'data': data});
  //       })
  //       .catch(function(error){
  //         reject({'error': error});
  //       })
  //     });
  //   }
  // }

  // GetListService.$inject = ['firebaseDataService', '$firebaseArray', '$q'];
  //
  // function GetListService(firebaseDataService, $firebaseArray, $q) {
  //   var vm = this;
  //   var ref = firebaseDataService.lists;
  //   var lists = $firebaseArray(ref);
  //
  //   return lists;
  // }

}());
