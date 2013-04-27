'use strict';

function handler404 (req, res) {    
    res.writeHead(404);
    res.end();
}  

function RealTimeServer () {

}

RealTimeServer.prototype.start = function (config) {    
    var app,
    io,    
    url = require('url'),
    httpsys = require('httpsys').http();

app = httpsys.createServer(handler404);
io = require('socket.io').listen(app);

app.listen('http://*:'+config.port/*+'/'+process.id+'/*'*/);

io.sockets.on('connection', function (socket) {
  socket.emit('msg',{ hello: 'world' });
  socket.on('msg', function (data) {
    console.log(data);
  });
});
};

module.exports = {
    RealTimeServer : RealTimeServer
};