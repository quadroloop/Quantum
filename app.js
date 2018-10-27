var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var ks = require('node-key-sender');


app.use(express.static('public'));
app.use(express.static('./public/img'));




app.set('port', (process.env.PORT || 5000));

http.listen(5000);


var route = "/";
app.get(route, function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

var route = "/game";
app.get(route, function(req, res) {
  res.sendFile(path.join(__dirname, './public/controller.html'));
});

var port = 5000;



// Socket Functions, for real time communication
io.sockets.on('connection', function(socket) {

    socket.broadcast.emit('welcome', { message: 'Welcome!' });

    socket.on('fook', function(resx) {
      console.log('Scan event detected, cascading event');
           io.emit('scan', { data: resx });

    });

    socket.on("revert", (data)=>{
    	console.log("revert requested, by VM!");
    	io.emit("revert",{data: "reload all"});
    });
    
    socket.on("keyStroke",(resKey)=>{
       console.log("controller event: "+resKey.key); 
        ks.sendKey(resKey.key);
    });

});

var ip;

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      ip=iface.address;
    }
    ++alias;
  });
});

console.log(`
  ===========================================
                 Quantum Server
  ===========================================
   Waiting for connections, connect using
   you devices to link below:

   http://${ip}:5000/game

  `);

const opn = require('opn');

opn(`http://${ip}:5000`);

