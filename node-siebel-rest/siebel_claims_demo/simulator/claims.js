var express = require('express')
var router = express.Router();

var CLAIMS = [
  {claimNumber: '1-L78XTX', reportedDate: '2/26/2018 11:30 am', policyNumber: 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohammed', status: 'OPEN', lossDate:'06/12/2018'},
  {claimNumber: '1-OOCR13', reportedDate: '2/27/2018 11:30 am', policyNumber: '1G1156K01', lastName: 'tester', firstName: 'first2', status:'OPEN', lossDate:''},
  {claimNumber: '1710118', reportedDate: '4/26/2018 11:30 am', policyNumber: '1K9087TY02', lastName: 'Abdellah', firstName: 'first3', status:'CLOSED', lossDate:''},
  {claimNumber: '1710675', reportedDate: '6/26/2018 11:30 am', policyNumber: 'KM-VEH-006', lastName: 'tester', firstName: 'first1'},
  {claimNumber: '1711379', reportedDate: '5/26/2018 11:30 pm', policyNumber: '1A456YU009', lastName: 'tester', firstName: 'first2'}
];


var POLICY = [
  {
   "Policy Expiration Date":"10/01/2018 06:00:00", "Id":"1-3H01", "Type":"Auto","Primary Last Name": "Abdellah", "Primary First Name": "Mohammed"
  },
];
var DETAILS = [
  {claimNumber: '1-L78XTX', lossDate:'', policyNumber: 'KM-VEH-005', lastName: 'Abdellah', firstName: 'Mohammed', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1-OOCR13', lossDate: '', policyNumber: '1G1156K01', lastName: 'tester', firstName: 'first2', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1710118', lossDate: '', policyNumber: '1K9087TY02', lastName: 'tester', firstName: 'first3', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1710675', lossDate: '', policyNumber: 'KM-VEH-006', lastName: 'tester', firstName: 'first1', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1711379', lossDate: '', policyNumber: '1A456YU009', lastName: 'tester', firstName: 'first2', policyType: 'AUTO', status: 'OPEN', lossCode:''}
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
    var data = JSON.stringify({claims: CLAIMS.filter(claim => {
                 return claim.lastName === req.params.user.split(' ')[1] })
                              });
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(200).jsonp(data);
    console.log(data);
})

router.get('/claimDetails/:claimId', (req, res) => { 
    console.log('claimId:', req.params.claimId);
    var data = JSON.stringify({claimDetails:findDetail(req.params.claimId)[0] 
                  });
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(200).jsonp(data);
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

router.post('/addClaim/:user', (req, res) => {
    console.log('addClaim:', req.body);
    console.log(CLAIMS.length);
    var data = {
                'claimNumber':'GM' + Math.floor(Math.random() * 1000) + 1000,
                'reportedDate':req.body.reportedDate ,
                'policyNumber':req.body.policyNumber ,
                'lastName':'Abdellah' , 
                'firstName': 'Mohammed',
                'status': 'OPEN', 
                'lossDate':req.body.lossDate,
		'policyType':'AUTO',
		'lossCode':'C'
                };
    CLAIMS.push(data);
    res.set({'Content-Type': 'Application/json',
             'Access-Control-Allow-Origin': '*'});
    res.status(201).json(JSON.stringify({claim: data}));
    console.log(JSON.stringify({claim: data}));
    console.log(CLAIMS.length);
})

module.exports = router;
