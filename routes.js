
module.exports = {
	load: function(app, mongoose, Book){

		//middleware to enable CORS
		app.all('*', function(req, res, next) {
    		res.header("Access-Control-Allow-Origin", "*");
    		res.header("Access-Control-Allow-Headers", "X-Requested-With");
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
		app.get('/books',function (req, res){

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


	}
}

