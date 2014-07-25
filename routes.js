'use strict';

module.exports = {
	load: function(app, mongoose){

		//load modules
		var Book = require('./models/book'),
			http = require('http'),
			xml2js = require('xml2js');

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



		app.get('/search' , function(req, res){

			var xmlResponse='',
				parser = new xml2js.Parser(),
				options = {
  					host: 'www.librarything.com',
  					path: '/services/rest/1.1/?method=librarything.ck.getwork&name=' + encodeURIComponent(req.query.name)+'&apikey=d231aa37c9b4f5d304a60a3d0ad1dad4'
				};


			http.request(options, function(response) {

  				//add chunk of data
  				response.on('data', function (chunk) {
    				xmlResponse += chunk;
    				console.log('1');
  				});

  				//response has been received
  				response.on('end', function () {

  					//parse xml to json
  					parser.parseString(xmlResponse, function(err,result){
  						res.send(result);

  					});
  				});

			}).end();


		});


	}
};

