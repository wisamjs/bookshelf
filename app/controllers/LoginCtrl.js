'use strict';

myApp.controller('LoginController',
	['$scope', '$location',  'Library', function($scope ,$location , Library){

		//login user
		$scope.login = function(user){
			Library.login(user)

			.then(function(){
				//promise fulfilled
				$location.path('/home');

			},

			function(error){
				//promise rejected
				console.log('error' + error);
			});
		};

		$scope.logout = function(){

		};



	}]);