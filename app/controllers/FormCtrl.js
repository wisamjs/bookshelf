myApp.controller('FormController',
	['$scope','$http', 'Library', function($scope,$http, Library){

		var defaultForm = {
			name: "",
			author: "",
			genre: ""
		};


		$scope.submit = function(book){

			Library.addBook(book)

			.then(function(data){

				//promise fulfilled
				//Add book and clear form
				$scope.books.push(book);
				$scope.newBookForm.$setPristine();
				$scope.book = angular.copy(defaultForm);
			},

			function(error){
				//promise rejected
				console.log('error');
			});
        };

	}]);