'use strict';
var myApp =

angular.module('MyApp', ['ngRoute'])
 .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


  	/*locationProvider is a built in
  	AngularJs service for configuring application
  	linking paths.
  	*/
  	$locationProvider.html5Mode(true);

  	//Routes
  	$routeProvider
	  	.when('/', {
		    templateUrl: 'views/home.html'
		  });
  }]);