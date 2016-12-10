(function() {
  'use strict';

  angular
    .module('app')
    .service('ListService', ListService)
    .service('AddListService', AddListService)
    .service('GetListService', GetListService)

  ListService.$inject = ['$firebaseArray', '$firebaseObject', '$q', 'firebaseDataService'];

  function ListService($firebaseArray, $q, $firebaseObject, firebaseDataService) {
    return {
      getList: getList
    }


    function getList(id){
      if(firebaseDataService === undefined){
        firebaseDataService.init;
      }
      var ref = firebaseDataService.lists;
      console.log(ref.child(id));
      var data = $firebaseObject(ref.child(id));
      return data;
    }
  }

  AddListService.$inject = ['$firebaseArray', '$q', 'firebaseDataService'];

  function AddListService( $firebaseArray, $q, firebaseDataService){
    var vm = this;
    if(firebaseDataService === undefined){
      firebaseDataService.init;
    }
    var ref = firebaseDataService.lists;
    var lists = $firebaseArray(ref);

    vm.addList = addList;

    function addList(list) {

      return $q(function(resolve, reject) {
        lists.$add(list)
        .then(function(data) {
          resolve({'data': data});
        })
        .catch(function(error){
          reject({'error': error});
        })
      });
    }
  }

  GetListService.$inject = ['firebaseDataService', '$firebaseArray', '$q'];

  function GetListService(firebaseDataService, $firebaseArray, $q) {
    var vm = this;
    var ref = firebaseDataService.lists;
    var lists = $firebaseArray(ref);

    return lists;
  }

}());
