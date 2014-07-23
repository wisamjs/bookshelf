myApp.controller('MainController',
	['$scope','$http', function($scope,$http){

		$scope.books;
		$http.get('http://localhost:3000/books')

			.success( function(data, status, headers, config){
				$scope.books = data;
				console.log(data);
			})

			.error(function(data, status, headers, config){
				console.log('error');

			});
		$scope.submit = function(book){
			console.log(book);
			$http.post('http://localhost:3000/book',
				{
					name: book.name,
					genre: book.genre,
					autho: book.author
				})

			.success( function(data, status, headers, config){
				console.log("SUCCESS");
			})

			.error(function(data, status, headers, config){
				console.log('error');

			});
        };
}]);