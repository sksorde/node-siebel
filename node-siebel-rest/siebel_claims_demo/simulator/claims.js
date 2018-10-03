var express = require('express')
var router = express.Router();

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

router.use(function timeLog(req, res, next) {
  console.log('Time:', Date.now())
  next()
})

router.get('/allClaims/:user', function(req, res) {
    console.log('user:', req.params.user);
    var data = JSON.stringify({items: CLAIMS.filter(claim => {
                 return claim.lastName === req.params.user.split(' ')[1] })
                              });
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(200).jsonp(data);
    console.log(data);
})

router.get('/claimDetails/:claimId', (req, res) => {
    console.log('claimId:', req.params.claimId);
    var data = findDetail(req.params.claimId)[0];
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(200).jsonp(JSON.stringify(data));
    console.log(data);
})

router.get('/policyDetails/:user', (req, res) => {
    var data = POLICY.find(detail => {
              return detail["Primary Last Name"] === req.params.user.split(' ')[1]});

    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(200).jsonp(JSON.stringify(data));
    console.log(data);
})

router.put('/addClaim/:user', (req, res) => {
    console.log('addClaim:', req.body);
    console.log(CLAIMS.length);
    var data = {
                "Claim Number":'GM' + Math.floor(Math.random() * 1000) + 1000,
                "Policy Number":req.body["Asset Id"],
                "Location Description": req.body["Location Description"],
		"Loss Date": req.body["Loss Date - Non UTC"],
		"lastName": req.params.user.split(' ')[1],
		"firstName": req.params.user.split(' ')[0],
                };
    CLAIMS.push(data);
    DETAILS.push(data);
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(201).json(JSON.stringify({Id: data["Claim Number"]}));
    console.log(JSON.stringify(CLAIMS));
    console.log(CLAIMS.length);
})

module.exports = router;
