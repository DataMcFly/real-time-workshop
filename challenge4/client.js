//	real-time socket listeners...
var url = "http://localhost:" + process.env.PORT || 5000;
var chat = require('socket.io-client')( url );

chat.on('connect', function () {
	var json = {
		"name":"Roger"	
	};
	chat.emit('set', {key: "test", data: json});
	chat.emit('get', {key: "test", data: json}).on('value', function(data){
		console.log( data );
	});
	chat.on('added', function(data){
		console.log( data );
	});
});