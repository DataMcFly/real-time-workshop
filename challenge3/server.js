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

//	real-time socket listeners...
var io = require('socket.io')(server);

io.on('connection', function (socket) {
	socket.on('getall', function (data){
		db.createReadStream().on('data', function (data) {
			socket.emit('value', data );
		}).on('error', function (err) {
			console.log('Oh my!', err)
		}).on('close', function () {
			console.log('Stream closed')
		}).on('end', function () {
			console.log('Stream closed')
		})		
	});
	socket.on('get', function (data) {
		var key = data.key;
		db.get(key, function(err, data) {
			console.log( JSON.stringify(data) );
			socket.emit('value', data );
		});	
	});

	socket.on('set', function (data) {
		var key = data.key;
		var json = data.data;
		
		db.put(key, json, function() {
			db.get(key, function(err, data) {
				console.log( JSON.stringify(data) );
				socket.emit('added', data );
				socket.emit('value', data );
			});
		});
	});
});


//	api end points...

app.get('/data/:key', function(request, response) {
	var key = request.param('key');

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

app.get('/', function(request, response){
	response.sendfile("./index.html" );
});

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});