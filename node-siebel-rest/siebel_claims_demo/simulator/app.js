var express = require('express')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var claims = require('./claims');

app.use('/claims', claims)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(9999, () => console.log('Example router listening on port 9999!'));


