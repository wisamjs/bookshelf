myApp.controller('MainController',
	['$scope','$http', 'Library', function($scope,$http, Library){

		$scope.getBooks = Library.getBooks()

			.then(function(data){

				//promise fulfilled
				$scope.books =  data;

			}, function(error){

				//promise rejected
				console.log('error');
			});

		$scope.submit = function(book){

			Library.addBook(book)

			.then(function(data){
				//promise fulfilled
				console.log('success');
			},

			function(error){
				//promise rejected
				console.log('error');
			});
        };


}]);