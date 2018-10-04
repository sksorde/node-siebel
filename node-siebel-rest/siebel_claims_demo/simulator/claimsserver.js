var express = require('express')
var router = express.Router();

var request = require('request');
var fs = require('file-system')
, path = require('path')
   , certFile = path.resolve(__dirname, 'siebelkeystoreCASigned.cer');
var siebelUrl = 'https://win-b1ejslvnv0l.siebel-pravici.com:9301';

var CLAIMS = [
  {"Claim Number": '1-L78XTX', "Policy Number": 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohamed', "Status Code": 'OPEN', "Loss Date":'06/12/2018', "Loss Description":"parking lot Thom Thumb store"},
  {"Claim Number": '1-OOCR13', "Policy Number": 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohamed', "Status Code": 'OPEN', "Loss Date":'06/12/2018', "Location Description":"parking lot Thom Thumb store"},
  {"Claim Number": '1710118', "Policy Number": 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohamed', "Status Code": 'OPEN', "Loss Date":'06/12/2018', "Location Description":"parking lot Thom Thumb store"},
  {"Claim Number": '1710675', "Policy Number": 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohamed', "Status Code":'OPEN', "Loss Date":'06/12/2018', "Location Description":"parking lot Thom Thumb store"},
];


var POLICY = [
  {
   "Policy Expiration Date":"10/01/2018 06:00:00", "Id":"1-3H01", "Type":"Auto","Primary Last Name": "Abdellah", "Primary First Name": "Mohammed"
  },
];
var DETAILS = [
  {"Claim Number": '1-L78XTX', "Loss Date":'', "Policy Number": 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohammed', "Policy Type": 'AUTO', "Status Code": 'OPEN', "Loss Code":''},
  {"Claim Number": '1-OOCR13', "Loss Date": '', "Policy Number": '1G1156K01', lastName: 'tester', firstName: 'first2', "Policy Type": 'AUTO', "Status Code": 'OPEN', "Loss Code":''},
  {"Claim Number": '1710118', "Loss Date": '', "Policy Number": '1K9087TY02', lastName: 'tester', firstName: 'first3', "Policy Type": 'AUTO', "Status Code": 'OPEN', "Loss Code":''},
  {"Claim Number": '1710675', "Loss Date": '', "Policy Number": 'KM-VEH-006', lastName: 'tester', firstName: 'first1', "Policy Type": 'AUTO', "Status Code": 'OPEN', "Loss Code":''},
  {"Claim Number": '1711379', "Loss Date": '', "Policy Number": '1A456YU009', lastName: 'tester', firstName: 'first2', "Policy Type": 'AUTO', "Status Code": 'OPEN', "Loss Code":''}
];

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

    var url = siebelUrl + '/siebel/v1.0/data/Demo INS Policy/INS Policy/1-3H01';
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
