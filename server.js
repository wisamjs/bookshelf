'use strict';

//Load Modules
var mongoose = require('mongoose'),
	express = require('express'),
	bodyParser = require('body-parser'),
	routes = require('./routes'),
	path = require('path'),
	Book = require('./models/book');

//Express setup
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app')));



//Database Connection
mongoose.connect('localhost/newDB');

mongoose.connection.on('connected',function(){
	console.log('Connection successful');

});

mongoose.connection.on('error', function(error){
	console.log('error' + error);
});

//Routes
routes.load(app,mongoose, Book);

//Start server
app.listen( app.get('port'),function(){
	console.log('Listening on port: ' + app.get('port'));
});
