'use strict';


angular.module('MyApp')
	.factory('Book', function(){

		//constructor
		function Book(name, author, rating, genre, poster){
			this.name = name;
			this.author = author;
			this.rating = rating;
			this.genre = genre;
			this.poster = poster;
		}

		return Book;
	});