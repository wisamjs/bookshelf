angular.module('MyApp')
  .factory('Library', ['$http', function($http, $q) {
    return {

    	addBook: function(book ){
    		return $http.post('http://localhost:3000/book',

	    	{
				name: book.name,
				genre: book.genre,
				author: book.author,
			})

			.then( function(response){
				//promise fulfilled
				console.log('success');
			},

			function(response){
				//promise rejected
				return $q.reject(response.data);
			});

		},

		getBooks: function(){
			var thedata;

			return $http.get('http://localhost:3000/books')

			.then(function(response){

				//promise fulfilled
				if (typeof response.data === 'object'){

					return response.data;
				}else{

					//invalid response
					return $q.reject(response.data);
				}

			}, function(response){

				//promise rejected
				return $q.reject(response.data);
			});

		}
	}
}]);
