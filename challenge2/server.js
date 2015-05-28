var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var levelup = require ('levelup');	

var database = './test';
var db = levelup (database, {keyEncoding: 'json', valueEncoding: 'json'});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true	}));
app.set('port', process.env.PORT || 5000);

var server = require('http').Server(app);

app.get('/data/:key', function(request, response) {
	var key = request.param('key');
console.log( key );
	db.get(key, function(err, data) {
		response.send( JSON.stringify(data) );
	})	
});
app.post('/data/:key', function(request, response) {
	var key = request.param('key');
	var json = request.body;

	db.put(key, json, function() {
		db.get(key, function(err, data) {
			response.send( JSON.stringify(data) )
		})
	})
});

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});