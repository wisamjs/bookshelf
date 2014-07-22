
module.exports = {
	load: function(app, mongoose, Book){
		app.get('/', function(req,res,next){
			res.json({'message':'welcome to our api'});
		});

		//add book
		app.post('/books', function(req,res,next){
			var book = new Book({
				name: req.query.name,
				description: req.query.description,
				poster: req.query.poster
			});

			console.log(req.body.name);
			console.log(req.query.name);

			book.save(function(err){
				if (err){
					return next(err);
				}
				res.json({ message: 'Book created'});
			});
		});
		//get all books
		app.get('/books',function (req,res){
			Book.find(function(err,books){
				res.json(books);
			});
		});

	}
}

