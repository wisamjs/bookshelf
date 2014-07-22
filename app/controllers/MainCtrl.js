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
}]);