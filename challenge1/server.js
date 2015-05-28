var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended: true	}));
app.set('port', process.env.PORT || 5000);

var server = require('http').Server(app);

app.get('/', function(request, response) {
	response.send("Hi");
});

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});