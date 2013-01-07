'use strict'

exports.version = '0.1.0'

var bouncy = require('bouncy')
var seaport = require('seaport')
var seaport_server = seaport.createServer()
seaport_server.listen(11337)

seaport_server.on('register',function(service) {
//todo - register the incoming seaport connection as a route!
});
seaport_server.on('free',function(service) {
//todo - remove the incoming seaport connection from route!
});

var barista_router_class = require('barista').Router
var r = new barista_router_class

var http = require('http')
bouncy(function (req, res, bounce) {
  var b = r.first(req.url)
  var con = b.controller

  var ps = seaport_server.query(con)

  if (ps.length === 0) {
    //var res = bounce.respond();
    res.end('service not available\n');
  }
  else {
    bounce(ps[Math.floor(Math.random() * ps.length)]);
  }



//  res.writeHead(200, {'Content-Type': 'text/plain'})
//  res.end('Hello World\n')
}).listen(1337)
console.log('Server running at http://311rh5d01:1337/')
