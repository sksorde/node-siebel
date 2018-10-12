var express = require('express')
var router = express.Router();

var request = require('request');
var fs = require('file-system')
, path = require('path')
   , certFile = path.resolve(__dirname, 'siebelkeystoreCASigned.cer');
var siebelUrl = 'https://win-b1ejslvnv0l.siebel-pravici.com:9301';

function findDetail(detail) {
  return DETAILS.filter(function(elem) {
	return detail === elem.claimNumber ? elem : '{}';
  })
}

router.get('/allClaims/:user', function(req, res) {
    console.log('user:', req.params.user);
    var url = siebelUrl + '/siebel/v1.0/data/Demo INS Claims/INS Claims';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({url}, (err, httpResponse, body) => {
      if (err) {
        console.log(err);
        return res.status(httpResponse.statusCode).json(body);
      }
      console.log(url, body);
      res.set({'Content-Type': 'Application/json',
               'Access-Control-Allow-Origin': '*'});
      res.status(httpResponse.statusCode).json(body);

    }).auth('SADMIN', 'gopravici2018');
})

router.get('/claimDetails/:claimId', (req, res) => {
    console.log('claimId:', req.params.claimId);

    var url = siebelUrl + '/siebel/v1.0/data/Demo INS Claims/INS Claims/' + req.params.claimId;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({url}, (err, httpResponse, body) => {
      if (err) {
        console.log(err);
        return res.status(httpResponse.statusCode).json(body);
      }
      console.log(url, body);
      res.set({'Content-Type': 'Application/json',
               'Access-Control-Allow-Origin': '*'});
      res.status(httpResponse.statusCode).json(body);

    }).auth('SADMIN', 'gopravici2018');
})

router.get('/policyDetails/:user', (req, res) => {
    var url = siebelUrl+ '/siebel/v1.0/data/Demo INS Policy/INS Policy/1-3H01';
    var options = {
        uri: url,
        agentOptions: {
            cert: fs.readFileSync(certFile),
          }
        };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.get({url}, (err, httpResponse, body) => {
      if (err) {
        console.log(err);
        return res.status(httpResponse.statusCode).json(body);
      }
      console.log(url, body);
      res.set({'Content-Type': 'Application/json',
               'Access-Control-Allow-Origin': '*'});
      res.status(httpResponse.statusCode).json(body);

    }).auth('SADMIN', 'gopravici2018');

})

router.put('/addClaim/:user', (req, res) => {
    console.log('addClaim:', req.body);
    var url = siebelUrl + '/siebel/v1.0/data/Demo INS Claims/INS Claims/';
    var options = {
        uri: url,
        agentOptions: {
            cert: fs.readFileSync(certFile),
          }
        };
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request.put({url:url,
      json : req.body
    }, (err, httpResponse, body) => {

      if (err) {
        console.log(err);
        return res.status(httpResponse.statusCode).json(err);
      }
      console.log(url, body);
      res.set({'Content-Type': 'Application/json',
               'Access-Control-Allow-Origin': '*'});
      res.status(httpResponse.statusCode).json(JSON.stringify(body));

    }).auth('SADMIN', 'gopravici2018');
})

module.exports = router;
