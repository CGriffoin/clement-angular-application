"use strict";

var selected;

fwkApp.controller("myController",function myController($scope, FrameworkService) {

    FrameworkService.fetch()
        .success(function(resp){
          $scope.frameworks = resp;
            $scope.model = {selectedFrameworkId : $scope.frameworks[0].id};
	    //$scope.selected.framework = $scope.frameworks[0].name;
	    //$scope.selected.framework = 'AngularJS';
        })
        .error(function(resp){
           console.log(resp);
        });

    $scope.selectedFramework = function(framework){
        selected = framework;
    }

    $scope.remove = function(index){
        console.log("[Suppression] index : "+index+", nom : "+$scope.frameworks[index].name);
        FrameworkService.remove($scope.frameworks[index].id).success(function(resp){
            console.log("[Suppression] Suppression effectuée");
            var lengthBefor = $scope.frameworks.length;
            $scope.frameworks.splice(index, 1);
            var lengthAfter = $scope.frameworks.length;
            if(lengthBefor === lengthAfter){
                console.error("[Suppression] La suppression n'a pas eu lieu...")
            }
        })
            .error(function(resp){
                console.error(resp);
            })

    }
});

fwkApp.controller("addFwkFormController" ,function addFwkFormController($scope, $routeParams, FrameworkService){
    var nextId = 0;
    FrameworkService.fetch().success(function(resp){
        var lastId = 0;
        for(var i=0;i<resp.length;i++){
          if(resp[i].id > lastId){
              lastId = resp[i].id;
          }
        }
        nextId = parseInt(lastId) +1;
    })

    $scope.addFwk = function(framework){
        FrameworkService.create(framework).success(function(resp){
           $scope.frameworks.push(framework);
           $scope.framework = {};
        })
            .error(function(resp){
                console.error(resp);
            });
    }

    $scope.initFwk = function(){
        $scope.framework = {};
        $scope.fwkForm.$setPristine(true);
    }

});
fwkApp.controller("editController" ,function editController($scope, FrameworkService, $routeParams, $location){

    var frameworkId = $routeParams.id;

    FrameworkService.fetchOne(frameworkId)
        .success(function(framework){
            $scope.framework = framework;
        });

    $scope.edit = function(framework){
        FrameworkService.update(framework)
            .success(function(resp){
                $location.path('/home');
        })
            .error(function(resp){
                console.error("[Edition] "+resp);
            })
    }

});
