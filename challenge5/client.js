function DataManager( db ) {
	this.db = db;
	this.url = "http://localhost:" + process.env.PORT || 5000;
	this.endpoint = this.url + "/" + this.db;
	var socket = require('socket.io-client')( this.url );
	return this;
}

DataManager.prototype.on = function(event, cb) {
	var _this = this;
	this.socket.on(event, cb );
	return _this;
};

DataManager.prototype.emit = function(event, data) {
	this.socket.emit(event, data);
	return _this;
};