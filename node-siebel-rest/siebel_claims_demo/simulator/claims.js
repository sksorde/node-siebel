var express = require('express')
var router = express.Router();

var CLAIMS = [
  {claimNumber: '1-L78XTX', reportedDate: '2/26/2018 11:30 am', policyNumber: 'KM-VEH-005', lastName: 'tester', firstName: 'first1'},
  {claimNumber: '1-OOCR13', reportedDate: '2/27/2018 11:30 am', policyNumber: '1G1156K01', lastName: 'tester', firstName: 'first2'},
  {claimNumber: '1710118', reportedDate: '4/26/2018 11:30 am', policyNumber: '1K9087TY02', lastName: 'tester', firstName: 'first3'},
  {claimNumber: '1710675', reportedDate: '6/26/2018 11:30 am', policyNumber: 'KM-VEH-006', lastName: 'tester', firstName: 'first1'},
  {claimNumber: '1711379', reportedDate: '5/26/2018 11:30 pm', policyNumber: '1A456YU009', lastName: 'tester', firstName: 'first2'}
];

var DETAILS = [
  {claimNumber: '1-L78XTX', lossDate:'', policyNumber: 'KM-VEH-005', lastName: 'tester', firstName: 'first1', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1-OOCR13', lossDate: '', policyNumber: '1G1156K01', lastName: 'tester', firstName: 'first2', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1710118', lossDate: '', policyNumber: '1K9087TY02', lastName: 'tester', firstName: 'first3', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1710675', lossDate: '', policyNumber: 'KM-VEH-006', lastName: 'tester', firstName: 'first1', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1711379', lossDate: '', policyNumber: '1A456YU009', lastName: 'tester', firstName: 'first2', policyType: 'AUTO', status: 'OPEN', lossCode:''}
];

router.use(function timeLog(req, res, next) {
  console.log('Time:', Date.now())
  next()
})

router.get('/allClaims/:user', function(req, res) {
    console.log('user:', req.params.user);
    var data = JSON.stringify({claims: CLAIMS});
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(200).jsonp(data);
    console.log(data);
})

router.get('/claimDetails/:claimId', (req, res) => { 
    var data = JSON.stringify({claimDetails:DETAILS});
    res.status(200).jsonp(data);
    console.log(data);
})

router.get('/policyDetails/:user', (req, res) => res.send('policy details'));

module.exports = router;
