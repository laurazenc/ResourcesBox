(function () {
  'use strict';

  angular
      .module('app')
      .controller('AddListController', AddListController);

  AddListController.$inject = ['$q', '$rootScope', '$scope', 'ListService', 'AddResourceService', 'TagService', 'UserService', 'notifications', '$firebaseObject'];
  function AddListController ($q, $rootScope, $scope, ListService, AddResourceService, TagService, UserService, notifications, $firebaseObject) {
    $scope.remove         = remove;
    $scope.addResource    = addResource;
    $scope.addList        = addList;
    $scope.loadTags       = loadTags;
    $scope.linkInfo       = {};
    $scope.newListId      = '';
    $scope.resources      = [];
    $scope.tags           = [];
    $scope.tagString      = [];
    $scope.data = {
      availableOptions: [ { id: '1', name: 'Design' },
                          { id: '2', name: 'Development' },
                          { id: '3', name: 'Tutorial' },
                          { id: '4', name: 'Other' } ],
      selectedOption: {
        id: '1',
        name: 'Design'
      }
    }
    function loadTags(query) {
      return TagService.getTags(query);
    };

    function remove (i) {
      $scope.resources.splice(i, 1);
    }

    function addResource () {
      var name, description, link, user, createdAt;
      if ($scope.resourcelink !== '') {
        ListService.httpGet($scope.resourcelink, $scope.resourcedescription)
        .then(function(data) {
          createdAt   = new Date().getTime();
          name        = data.title || '';
          description = (data.description) ? data.description.trim() : '';
          link        = data.responseURL;
          user        = $scope.user.uid;
          pushResource(name.trim(), description, link, user, createdAt);
        })
        .catch(function() {
          notifications.showError({message: 'Ups'});
        });
      }

      function pushResource(name, description, link, uid, createdAt) {
        $scope.resources.push({
          'name'       : name,
          'description': (description !== undefined) ? description : '',
          'link'       : link,
          'user'       : uid,
          'created_at' : createdAt
        });

        $scope.resourcename = '';
        $scope.resourcedescription = '';
        $scope.resourcelink = '';
      }
    }

    function addList () {
      if ($scope.listname) {
        if ($scope.resources.length !== 0) {
          console.log('saving');
          // Create list
          // add tags
          // add tags to listname
          // add resources to list
          ListService.addList({
            'name'     : $scope.listname,
            'category' : $scope.data.selectedOption.name,
            'createdBy': $scope.user.uid,
          })
          .then(addResources)
          .then(addTagsToDB)
          .then(tagsToList)

            // .then(function(list) {
            //   list.tags = $scope.tagString.toString();
            //   console.log(list);
            //   list.$save()
          .then(function() {
            notifications.showSuccess({message: 'List posted successfully'});
          })
            //   .catch(function(error) {
            //     notifications.showError({message: error});
            //   });
            // })
          .catch(function(error) {
            console.log(error);
            notifications.showError({message: error});
          });

        } else {
          $scope.errors = 'List should have at least one resource added';
        }
      } else {
        $scope.errors = 'List should have a name';
      }
    }

    function tagsToList() {
      return new Promise(function(resolve, reject) {
        var ref = ListService.getList($scope.newListId);
        var list = $firebaseObject(ref);
        list.$bindTo($scope, "tagString")
        .then(function() {
          console.log($scope.tagString.toString()); // { foo: "bar" }
          ref.set({ foo: $scope.tagString.toString() });  // this would update the database and $scope.data
          resolve();
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
      });
    }

    function addResources(data) {
      $scope.newListId = data.data.path.o[1];
      var promiseList = [];
      angular.forEach($scope.resources, function (resource, key) {
        var p = new Promise(function(resolve, reject) {
          AddResourceService.addResource({
            'listId'     : $scope.newListId,
            'name'       : resource.name,
            'description': resource.description,
            'link'       : resource.link,
            'user'       : resource.user
          })
          .then(function() {
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
            // notifications.showError({message: error});
          });
        });

        promiseList.push(p);
      });

      return Promise.all(promiseList);
    }

    function addTagsToDB() {
      var promiseList = [];
      angular.forEach($scope.tags, function(tag, key) {
        var p = new Promise(function(resolve, reject) {
          TagService.addTag({
            'value' : tag.text
          })
          .then(function(data) {
            (data.data.value) ? resolve(insertTagId(Object.key(data.data))) : resolve(getTagObject(data));
          })
          .catch(function(error) {
            console.log(error);
            tag.reject(error);
          });
        })
          promiseList.push(tag);
      });

      return Promise.all(promiseList);
    }

    function getTagObject(data) {
      if (data.data.path) {
        $scope.tagString.push(data.data.path.o[1]);
      } else{
        var key = Object.keys(data.data);
        $scope.tagString.push(key[0]);
      }

    }

    function insertTagId(id) {
      $scope.tagString.push(id);
    }
  }
}());
