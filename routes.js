
module.exports = {
	load: function(app, mongoose, Book){

		app.all('*', function(req, res, next) {
    		res.header("Access-Control-Allow-Origin", "*");
    		res.header("Access-Control-Allow-Headers", "X-Requested-With");
    		next();
		});
		
		app.get('/', function(req, res, next){
			res.json({'message':'welcome to our api'});
		});

		//add book
		app.post('/book', function(req, res, next){

			var book = new Book({
				name: 	req.query.name,
				author: req.query.author,
				rating: req.query.rating,
				genre: 	req.query.genre,
				poster: req.query.poster
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

