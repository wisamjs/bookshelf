'use strict';

angular.module('MyApp')
	.controller('MainController',
	['$scope','$http','$log', 'Library', function($scope, $http, $log, Library){

		$scope.getBooks = Library.getBooks()

			.then(function(data){


				//promise fulfilled
				$scope.books =  data;

			})
			.then(null,$log.error);

		$scope.remove = function(book){
			console.log(book);

			//remove from db
			Library.removeBook(book)

				.then(function(){

					//remove from front-end array
					$scope.books = _.without($scope.books,book);
					console.log($scope.books);
				})
				.then(null,$log.error);

		};


}]);