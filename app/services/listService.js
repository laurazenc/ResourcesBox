(function () {
  'use strict';

  angular
    .module('app')
    .service('ListService', ListService);

  ListService.$inject = ['$firebaseArray', '$firebaseObject', '$q', 'firebaseDataService', '$location'];

  function ListService ($firebaseArray, $firebaseObject, $q, firebaseDataService, $location) {
    return {
      getLists    : getLists,
      getList     : getList,
      addList     : addList,
      deleteList  : deleteList,
      httpGet     : httpGet,
      list        : list
    };

    function init () {
      if (!firebaseDataService) firebaseDataService.init;
    }

    function list(id) {
      return firebaseDataService.lists.child(id);            
    }

    function getLists () {
      var ref   = firebaseDataService.lists;
      var lists = $firebaseArray(ref);
      return lists;
    }

    function getList (id) {
      var ref   = firebaseDataService.lists;
      var list  = $firebaseObject(ref.child(id));
      return list;
    }

    function addList (list) {
      var ref   = firebaseDataService.lists;
      var lists = $firebaseArray(ref);
      return $q(function (resolve, reject) {
        list.created_at = firebase.database.ServerValue.TIMESTAMP;
        lists.$loaded(function () {
          lists.$add(list)
          .then(function (data) {
            resolve({'data': data});
            $location.path('/');
          })
          .catch(function (error) {
            reject({'error': error});
          });
        });
      });
    }

    function deleteList(list) {
      var ref = firebaseDataService.lists;
      var obj = $firebaseObject(ref.child(list.$id));

      return $q(function (resolve, reject) {
        obj.$remove()
          .then(function (data) {
            resolve();
          })
          .catch(function (error) {
            reject({'error': error});
          });
      });
    }

    function getTitle(html) {
      var parsedHTML = $.parseHTML(html);
      var title = '';
      $.each( parsedHTML, function( i, el ) {
        if(el.nodeName === 'TITLE'){
          title = $(el).find('title:first').context.text;
        }
      });
      return title;
    }

    function httpGet(theUrl, description){
      var proxy = 'https://cors-anywhere.herokuapp.com/';
      var xmlHttp = new XMLHttpRequest();
      return $q(function(resolve, reject) {
        xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.readyState==4 && xmlHttp.status==200) {
            var title = getTitle(xmlHttp.responseText);
            resolve({'title': title, 'responseURL': xmlHttp.responseURL, 'description': description});
          }
        };
        xmlHttp.onerror = function() {
          reject();
        }
        xmlHttp.open("GET", proxy + theUrl, true);
        xmlHttp.send();
      });
    }


  }
}());
