var express = require('express')
var bodyParser = require('body-parser');
var app = express()

var claims = require('./claims');

app.use('/claims', claims)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(9999, () => console.log('Example router listening on port 9999!'));


