"use strict";

fwkApp.factory("FrameworkService",['$http',function ($http) {
    var API_URI = '/server/fwk/fwk';

    return {

        fetch : function() {
            return $http.get(API_URI);
        },

        fetchOne : function(id) {
            return $http.get(API_URI + '/' + id);
        },

        create : function(framework) {
            return  $http.post(API_URI, framework);
        },


        remove : function(id) {
            return $http.delete(API_URI + '/' + id);
        },

        update : function(framework) {
            return $http.put(API_URI, framework);
        }
    };

}]);
