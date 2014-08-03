'use strict';

myApp.controller('LoginController',
	['$scope', '$location',  'Library', function($scope ,$location , Library){

		$scope.login = true;
		$scope.signup = false;

		//login user
		$scope.loginUser = function(user){
			Library.login(user)

			.then(function(){
				//promise fulfilled
				console.log('logged in');
				$location.path('/home');

			},

			function(error){
				//promise rejected
				console.log('error' + error);
			});
		};

		$scope.logout = function(){

		};

		$scope.signupUser = function(user){
			Library.signup(user)

			.then(function(){

				console.log('you signed up');

			},

			function(error){
				console.log(error);
			});

		};



	}]);