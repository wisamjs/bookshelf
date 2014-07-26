'use strict';

myApp.controller('MainController',
	['$scope','$http', 'Library', function($scope,$http, Library){

		$scope.getBooks = Library.getBooks()

			.then(function(data){



				//promise fulfilled
				$scope.books =  data;
				console.log(data);

			}, function(error){

				//promise rejected
				console.log('error' + error);
			});

		$scope.remove = function(book){

			//remove from db
			Library.removeBook(book)

				.then(function(){

					//remove from front-end array
					$scope.books.pop(book);
				},

				function(err){
					console.log(err);
				});

		};


}]);