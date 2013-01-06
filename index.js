'use strict'

exports.version = '0.1.0'

var rp = require('barista').Router
var r = new rp

r.match('/add','GET').to("add.me").name("add")
r.match('/del','GET').to("del.me").name("del")

var has = 0



var http = require('http')
http.createServer(function (req, res) {
  var b = r.first(req.url)
  var con = b.controller

  switch(con) {
  case 'add':
    r.match('/foo','GET').to("foo.me").name("foozz")
    res.end("Added /foo\n")
    break
  case 'del':
    console
    r.remove('foozz')
    res.end("Killed /foo?\n")
    break
  case 'foo':
    res.end("FOUND FOO!\n")
    break
  default:
    res.end("SORRY!\n")
    break
  }



//  res.writeHead(200, {'Content-Type': 'text/plain'})
//  res.end('Hello World\n')
}).listen(1337, '127.0.0.1')
console.log('Server running at http://127.0.0.1:1337/')
