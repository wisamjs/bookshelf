'use strict';


angular.module('MyApp')
	.factory('Book', function(){

		//constructor
		function Book(id, name, author, rating, genre, poster){
			this.id = id;
			this.name = name;
			this.author = author;
			this.rating = rating;
			this.genre = genre;
			this.poster = poster;
		}

		return Book;
	});