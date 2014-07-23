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


}]);