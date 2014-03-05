_ = require 'lodash'
logger = require 'torch'
should = require 'should'

rel = require '../rel'

getClient = require rel 'lib/getClient'
restGenerator = require rel 'lib/restGenerator'

describe 'Generator', ->

  it 'should generate services', (done) ->

    getClient 'OrderWebService.WSDL', (err, client) ->
      {services} = restGenerator(client)

      services.should.have.keys [
        "Order/SynchronizeOrder", "Order/DeleteOrder", "Order/GetOrderById",
        "Order/UpdateOrder", "Order/GetOrder", "Order/InsertOrder",
        "OrderItem/GetOrderItemById", "OrderItem/GetOrderItem", "OrderItem/DeleteOrderItem",
        "OrderItem/InsertOrderItem", "OrderItem/UpdateOrderItem", "OrderItem/SynchronizeOrderItem"
      ]

      done()

  it 'should create an order', (done) ->
    @timeout 0

    # Create a node-soap client based on this WSDL.
    getClient 'OrderWebService.WSDL', (err, client) ->

      # generate a set of services (can be called programmatically)
      {services} = restGenerator(client)

      # get our sample order
      body = require rel 'data/order_sample'

      # send the request to the SOAP API
      services['Order/InsertOrder'] body, (err, result) ->

        if err
          logger.blue _.pick result, ['headers', 'statusCode']
        else
          logger.blue {err, result}

        should.not.exist err
        should.exist result

        done()

  it 'should list orders', (done) ->
    @timeout 0

    # Create a node-soap client based on this WSDL.
    getClient 'OrderWebService.WSDL', (err, client) ->

      # generate a set of services (can be called programmatically)
      {services} = restGenerator(client)

      body = {OrderNumber: '1-7SDFTMXYZW'}

      services['Order/GetOrder'] body, (err, result) ->

        if err
          logger.blue _.pick result, ['headers', 'statusCode']
        else
          logger.blue {err, result}

        should.not.exist err
        should.exist result

        done()

  it 'should generate REST API', (done) ->
    @timeout 0

    connect = require 'connect'
    http = require 'http'
    request = require 'request'

    # Create a node-soap client based on this WSDL.
    # NOTE: This may be all you need if you just want programmatic access.
    getClient 'OrderWebService.WSDL', (err, client) ->

      # generate a set of services (can be called programmatically)
      # and a router (a REST API that can be plugged in as http/connect/express middleware)
      {services, router} = restGenerator(client)

      # demonstrate setup of a REST server
      server = connect()
      server.use connect.bodyParser()
      server.use router

      # REST services are live
      http.createServer(server).listen 4000, ->

        # test with a sample request
        request.get 'http://localhost:4000/order/new', (err, response, body) ->
          logger.cyan {err, body}
          should.not.exist err
          response.statusCode.should.eql 200

          done()

