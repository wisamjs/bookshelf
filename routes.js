
module.exports = {
	load: function(app, mongoose){
		app.get('/', function(req,res,next){
			res.json({'message':'welcome to our api'});
		});
	}
}

