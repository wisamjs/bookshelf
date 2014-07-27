'use strict';

angular.module('MyApp')
  .factory('Library', ['$http', '$q','Book', function($http ,$q ,Book ) {
    return {

    	addBook: function(book ){
    		return $http.post('/book',

	    	{
	    		_id: book._id,
				name: book.name,
				genre: book.genre,
				author: book.author,
				poster: book.poster
			})

			.then( function(){
				//promise fulfilled
				console.log('success');
			},

			function(response){
				//promise rejected
				return $q.reject(response.data);
			});

		},

		getBooks: function(){

			return $http.get('/books')

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
		},

		removeBook: function(book){
			console.log('book' + book._id);
			return $http.delete('/remove/'+book._id)

			.then( function(){
				//promise fulfilled
				console.log('success');
			},

			function(response){
				//promise rejected
				return $q.reject(response.data);
			});
		},

		/* service that makes a request to '/search'
		   and returns a fulfilled or rejected promise
		*/
		searchBook: function(book){
			return $http.get('/search?name='+book.name)

			.then(function(response){
				if (typeof response.data === 'object'){

					//promise fulfilled
					console.log('success');
					return response.data;
				}else{

					//promise rejected
					return $q.reject(response.data);

				}

			},

			function(response){

				//promise rejected
				return $q.reject(response.data);
			});

		},
		/* Service that parses google books api
			response and returns an array of
			Book objects
		*/
		parse: function(data){
			var collection = [],
				result,
				i;

			//loop through results to add books
			for (i = 0; i < (data.items).length; i++){

				result= data.items[i];

				collection.push(

					new Book(

						result.id,
						result.volumeInfo.title,
						result.volumeInfo.authors,
						result.volumeInfo.averageRating,
						result.volumeInfo.categories,
						result.volumeInfo.imageLinks.thumbnail
					)
				);
			}

			return collection;
		}

	};
}]);
