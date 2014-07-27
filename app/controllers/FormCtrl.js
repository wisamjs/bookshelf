'use strict';

myApp.controller('FormController',
	['$scope','$http', 'Library', function($scope ,$http , Library){

		var defaultForm = {
			name: '',
			author: '',
			genre: ''
		};



		$scope.submit = function(book){

			Library.addBook(book)

			.then(function(){
				//promise fulfilled
				//Add book and clear form
				$scope.books.push(book);
				$scope.newBookForm.$setPristine();
				$scope.book = angular.copy(defaultForm);
			},

			function(error){
				//promise rejected
				console.log('error' + error);
			});
        };

        $scope.search = function(bookTitle){
        	Library.searchBook(bookTitle)

        	.then( function(data){
        		$scope.results = Library.parse(data);
        		console.log($scope.results);

        	},

        	function(error){
        		console.log(error);
        	});
        };

	}]);