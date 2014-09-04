'use strict';

angular.module('MyApp')
    .factory('User', function( $http ) {

        var service = {};

        service.login = function( user ) {
            return $http.post( '/login', {
                email: user.email,
                password: user.password

            });
        };

        service.signup = function( user ) {
            return $http.post( '/signup', {
                email: user.email,
                password: user.password
            });
        };
        return service;
    });