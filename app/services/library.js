'use strict';

angular.module('MyApp')
    .factory( 'Library', function( $http, $log, $q, Book ) {

        var service = {};

        service.addBook = function(book) {
            return $http.post( '/book', {
                _id   : book._id,
                name  : book.name,
                genre : book.genre,
                author: book.author,
                poster: book.poster
            });

        };

        service.getBooks = function() {

            return $http.get('/books')

            .then(function(response) {

                //promise fulfilled
                if ( typeof response.data === 'object' ) {

                    return response.data;
                } else {

                    //invalid response
                    return $q.reject(response.data);
                }

            }, function( response ) {

                //promise rejected
                return $q.reject(response.data);
            });
        }

        service.removeBook = function( book ) {
            return $http.delete('/remove/' + book._id);
        }

        /* service that makes a request to '/search'
		   and returns a fulfilled or rejected promise
		*/
        service.searchBook = function( book ) {
            return $http.get( '/search?name=' + book.name )

            .then(function( response ) {
                if ( typeof response.data === 'object' ) {

                    //Google Books API returned Error message
                    if ( response.data.hasOwnProperty('error') ) {
                        return $q.reject(response.data.error.message);
                    }
                    return response.data;
                } else {
                    //promise rejected
                    return $q.reject(response.data);

                }

            });

        };

        /* Service that parses google books api
			response and returns an array of
			Book objects
		*/
        service.parse = function(data) {
            var collection = [],
                result,
                i;

            //loop through results to add books
            for ( i = 0; i < (data.items).length; i++ ) {

                result = data.items[i];

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
        };

        return service;

    });