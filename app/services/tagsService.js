(function() {
  'use strict';
  angular
    .module('app')
    .service('TagService', TagService);

  TagService.$inject = ['$firebaseArray', '$firebaseObject', '$q', 'firebaseDataService'];

  function TagService($firebaseArray, $firebaseObject, $q, firebaseDataService) {
    return {
      getTags           : getTags,
      getListTagsValue  : getListTagsValue,
      addTag            : addTag
    };

    var tagsArray = [];
    var tagsRef   = firebaseDataService.tags;


    function getTags(query) {
      var ref = firebaseDataService.lists
                    .orderByChild('tags')
                    .startAt(null, query);
                    // .once('value', function (tags) {
                    //   console.log(tags.val());
                    // });
      return new Promise(function(resolve, reject) {
        ref.once('value').then(function(snapshot) {
          angular.forEach (snapshot.val(), function(list) {
            // angular.forEach(list.tags, function(tag, key) {
            //   console.log(key, query);
            //   // console.log(key.includes(query));
            //   // if(key.includes(query)) tagsArray.push(key);
            //   // console.log(tagsArray);
            //   // resolve(tagsArray);
            //   resolve();
            // });
          });

        }, function(error) {
          console.log('Promise was rejected');
          console.error(error);
          reject();
        });
      });
    }

    function getListTagsValue(tagsForValue) {
      var tagsValues = [];
       var tagList = $firebaseArray(firebaseDataService.tags);
       tagList.$loaded(function(tags) {
         angular.forEach(tags, function(tag) {
           angular.forEach(tagsForValue, function(t) {
             if(tag.$id === t) tagsValues.push(tag.value);
           });
         });
       });
       return tagsValues;
    }

    function getTagObject(tag) {
      var tags        = $firebaseArray(firebaseDataService.tags);
      var doesExists  = false;

      return $q(function (resolve) {
        firebaseDataService.tags
        .orderByChild("value")
        .equalTo(tag.value)
        .once("value", function(dataSnapshot){
          if(dataSnapshot.exists()){
            resolve({'data': dataSnapshot.val()});
          }
        });
      });
    }

    function tagAlreadyExist(tag) {
      var tags        = $firebaseArray(firebaseDataService.tags);
      var doesExists  = false;

        firebaseDataService.tags
        .orderByChild("value")
        .equalTo(tag.value)
        .once("value", function(dataSnapshot){
          if(dataSnapshot.exists()){
            doesExists =  true;
          }else {
            doesExists =  false;
          }     
        });
        return doesExists;


    }

    function addTag(newTag) {
      return (tagAlreadyExist(newTag)) ? getTagObject(newTag) : addTagToDB(newTag);
    }

    function addTagToDB(newTag) {
      var tags = $firebaseArray(firebaseDataService.tags);
      return $q(function (resolve, reject) {
        tags.$add(newTag)
        .then(function (data) {
          resolve({'data': data});
        })
        .catch(function (error) {
          reject({'error': error});
        });
      });
    }
  }



}());
