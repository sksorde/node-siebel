rel = require '../rel'
{exists} = require 'fs'
soap = require 'soap'
logger = require 'torch'
_ = require 'lodash'

module.exports = (wsdlName, done) ->
  return done new Error "wsdlName required!" unless wsdlName?

  wsdlPath = rel 'data', wsdlName

  exists wsdlPath, (result) ->
    unless result
      return done new Error 'WSDL def not found!'

    soap.createClient wsdlPath, (err, client) ->
      return done err if err?

      #output = _.omit client, 'wsdl'
      #logger.yellow {output}

      soapHeaders = [
        '<UsernameToken xmlns="http://siebel.com/webservices">SADMIN</UsernameToken>'
        '<PasswordText xmlns="http://siebel.com/webservices">SADMIN</PasswordText>'
        '<SessionType xmlns="http://siebel.com/webservices">None</SessionType>'
      ]
      for header in soapHeaders
        client.addSoapHeader header

      done null, client
