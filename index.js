'use strict'

exports.version = '0.1.0'

var bouncy = require('bouncy')
var seaport = require('seaport')
var seaport_server = seaport.createServer()
seaport_server.listen(11337)

seaport_server.on('register',function(service) {
//todo - register the incoming seaport connection as a route!
  var subdo = "/" + service.role + "*(.:format)"
  console.log("REG " + subdo)
  console.log(service)
  r.match(subdo,"GET").to(service.role + ".get").name(service.role + "_get")
//  r.match(
});
seaport_server.on('free',function(service) {
  console.log("FREE")
  r.remove(service.role + "_get")
//todo - remove the incoming seaport connection from route!
});

var barista_router_class = require('barista').Router
var r = new barista_router_class

var http = require('http')
var http_proxy = require('http-proxy')

http_proxy.createServer(function (req, res, proxy) {
  var b = r.first(req.url)
  var con = b.controller

  var ps = seaport_server.query(con)

  if (!con || ps.length === 0) {
    console.log("fallthrough")
    //var res = bounce.respond();
    //res.end('service not available\n');
    proxy.proxyRequest(req,res,{host: "linux3",port: 31337} );
  }
  else {
    console.log("match")
    console.log(ps)
    //var p = ps[Math.floor(Math.random() * ps.length)];
    //proxy.proxyRequest(req,res,
    proxy.proxyRequest(req,res,ps[Math.floor(Math.random() * ps.length)]);
  }



//  res.writeHead(200, {'Content-Type': 'text/plain'})
//  res.end('Hello World\n')
}).listen(1337)


console.log('Server running at http://311rh5d01:1337/')
