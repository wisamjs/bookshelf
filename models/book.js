var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
	name: String,
	author: String,
	rating: Number,
	genre: String,
	poster: String,

});
module.exports = mongoose.model('book', bookSchema);