'use strict'

var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname + '/'));

var port = process.env.PORT || 5000;
var server = app.listen(port, function (host) {
  var host = server.address().address;
  console.log('front end at http://%s:%s', host, port);
});