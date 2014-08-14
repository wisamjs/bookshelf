'use strict';

angular.module('MyApp')
  .factory('Library', ['$http', '$log', '$q','Book', function($http, $log, $q, Book) {
    return {


    	login: function(user){


    		return $http.post('/login',
    		{
    			email: user.email,
    			password: user.password

    		});
    	},

    	signup: function(user){
    		return $http.post('/signup',
    		{
    			email : user.email,
    			password: user.password
    		});
    	},

    	addBook: function(book ){
    		return $http.post('/book',

	    	{
	    		_id: book._id,
				name: book.name,
				genre: book.genre,
				author: book.author,
				poster: book.poster
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
			return $http.delete('/remove/'+book._id);
		},

		/* service that makes a request to '/search'
		   and returns a fulfilled or rejected promise
		*/
		searchBook: function(book){
			return $http.get('/search?name='+book.name)

			.then(function(response){
				if (typeof response.data === 'object'){

					//Google Books API returned Error message
					if (response.data.hasOwnProperty('error')){
						return $q.reject(response.data.error.message);
					}
					return response.data;
				}else{
					//promise rejected
					return $q.reject(response.data);

				}

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
