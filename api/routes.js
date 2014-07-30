'use strict';

module.exports = {
	load: function(app,passport,User){

		//load modules
		var Book = require('../models/book'),
			https = require('https');

		//middleware to enable CORS
		app.all('*', function(req, res, next) {
    		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    		next();
		});

		//Protect routes from unauthenticated requests
		var auth = function ensureAuthenticated(req, res, next) {
  			if (req.isAuthenticated()){
  				console.log(req);
  				next();
  			}
  			else{
  				res.send(401);
  			}
		}


		//signup
		app.post('/signup', function( req, res, next){

			var user = new User({
				email: req.body.email,
				password: req.body.password
			});

			user.save(function( err){
				if (err){
					return next(err);
				}
				res.send(200);
			})
		});

		//login
		app.post('/login', passport.authenticate('local'), function(req, res) {
  			res.cookie('user', JSON.stringify(req.user));
  			res.send(req.user);
		});

		//logout
		app.get('/logout', function( req, res, next){
			req.logout();
			res.send(200);
		});

		//check if user is logged in or not
		app.get('/loggedin', function(req, res) {

			res.send(req.isAuthenticated() ? req.user : '0');
		});


		//add book
		app.post('/book', function(req, res, next){

			var book = new Book({
				_id: req.body._id,
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
		app.get('/books', auth, function(req, res){

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

		//remove a book from Google Books api
		app.delete('/remove/:id', function(req, res, next){
				Book.remove({ _id: req.params.id}, function(err){
					if (err){
						return next(err);
					}else{
						res.send({ message: 'deleted'});
					}
				});
		});


	}
};

