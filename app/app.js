'use strict';

angular.module('MyApp', ['ui.router','ngMessages'])
    .config(function( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider ) {




  	/*locationProvider is a built in
  	AngularJs service for configuring application
  	linking paths.
  	*/
  	$locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');

        $httpProvider.responseInterceptors.push(function( $q, $location ) {

        return function( promise ) {
            return promise.then(
                // Success: just return the response
                function( response ) {
                    return response;
                },

                // Error: check the error status to get only the 401
                function( response ) {
                    if ( response.status === 401 ){
                        $location.url('/');
                    }

                    return $q.reject( response );
                }
            );
        };
    });

    //Routes
    $stateProvider
        .state( 'login', {
            url:'/',
            templateUrl: 'views/login.html'
        })

        .state( 'home', {
            url: '/home',
            templateUrl: 'views/home.html'
        });



  });