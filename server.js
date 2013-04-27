'use strict';

var port = process.env['HTTP_PORT'] || 80,
    app,    
    fs = require('fs'),
    url = require('url'),
    httpsys = require('httpsys').http(),
    RealTimeServer = require('./realtimeserver').RealTimeServer,
    //rtServer = new RealTimeServer(),
    urlListen;

app = httpsys.createServer(handler);
urlListen = 'http://*:'+port;
console.log('Attempting to listen on',urlListen);
app.listen(urlListen);
//rtServer.start({port: port});

function handler (req, res) {
    var urlParsed = url.parse(req.url);

    if (urlParsed.pathname === '/a'){
        res.writeHead(200);
        res.end(JSON.stringify({relUri: '/' + process.pid}));
        return;
    } else if (urlParsed.pathname === '/client.html'){
        fs.readFile(__dirname + '/client.html',
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading client.html');
                }
                res.writeHead(200);
                res.end(data);
            }); 
    } else {
        res.writeHead(404);
        res.end();
    }  
}