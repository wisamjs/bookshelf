'use strict';
var myApp =

angular.module('MyApp', ['ngRoute','ngMessages'])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {




  	/*locationProvider is a built in
  	AngularJs service for configuring application
  	linking paths.
  	*/
  	$locationProvider.html5Mode(true);

        $httpProvider.responseInterceptors.push(function($q, $location) {

        return function(promise) {
            return promise.then(
                // Success: just return the response
                function(response) {
                    return response;
                },

                // Error: check the error status to get only the 401
                function(response) {
                    if (response.status === 401){
                        $location.url('/');
                    }

                    return $q.reject(response);
                }
            );
        };
    });

  	//Routes
  	$routeProvider
	  	.when('/', {
		    templateUrl: 'views/login.html'
		  })
        .when('/home', {
            templateUrl: 'views/home.html'
        })
        .otherwise({
            redirectTo: '/'
          });
  }]);