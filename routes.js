'use strict';

module.exports = {
	load: function(app){

		//load modules
		var Book = require('./models/book'),
			https = require('https');

		//middleware to enable CORS
		app.all('*', function(req, res, next) {
    		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    		next();
		});

		//add book
		app.post('/book', function(req, res, next){

			var book = new Book({
				name: 	req.body.name,
				author: req.body.author,
				rating: req.body.rating,
				genre: 	req.body.genre,
				poster: req.body.poster
			});

			book.save(function(err){
				if (err){
					return next(err);
				}
				res.json({ message: 'Book created'});
			});
		});

		//get all books
		app.get('/books',function(req, res){

			Book.find(function(err,books){
				res.json(books);
			});
		});

		//get book by name
		app.get('/books/:name',function(req, res, next){

			Book.find( { name:req.params.name}, function(err, book){
				if (err){
					return next(err);
				}

				res.send(book);
			});
		});

		//get book by author
		app.get('/author/:author', function(req, res, next){

			Book.find({author: req.params.author},function(err, book){
				if (err){
					return next(err);
				}
				res.send(book);
			});
		});


		//get book info from Google Books Api
		app.get('/search' , function(req, res){

			var respData = '',
				apiHostname = 'www.googleapis.com',
				apiPath='/books/v1/volumes?key='+process.env.API_KEY+'&q=',

				//name param is encoded to be URI syntax friendly
				options = {
  					hostname: apiHostname,
  					path: apiPath + encodeURIComponent(req.query.name)
				};


			https.request(options, function(response) {

  				//add chunk of data
  				response.on('data', function (chunk) {
    				respData += chunk;
  				});

  				//response has been received
  				response.on('end', function () {
  					res.send(respData);
  				});

			}).end();


		});


	}
};

