"use strict";

var fwkApp = angular.module('fwkApp',['ngRoute']);

fwkApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller : 'myController'
        })
        .when('/home/edit/:id', {
            templateUrl : 'partials/edit.html',
            controller : 'editController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
