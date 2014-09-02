'use strict';

angular.module('MyApp')
	.controller( 'LoginController',
	function( $scope, $location, $log, Library, User) {

		$scope.login  = true;
		$scope.signup = false;

		//login user
		$scope.loginUser = function( user ) {
			User.login( user )

			.then(function() {
				//promise fulfilled
				$location.path('/home');

			})
			.then( null,$log.error );
		};

		$scope.logout = function() {

		};

		$scope.signupUser = function( user ){
			User.signup( user )

			.then(function() {


			})
			.then( null,$log.error );

		};



	});