'use strict';

var config = require('config');
var TransportFacade = require('../modules/transport/facade');
var TaskFacade = require('../modules/task/facade');
var ClientsManager = require('../modules/models/clients.manager');
var Constants = require('../modules/constants');

var transport = TransportFacade.createAndInitWSTransport(null, config.inCommingWebSocket);
var clients = new ClientsManager();

transport.on('connection', (client) => {
  console.log('connection socket', client._socket._handle ? client._socket._handle.fd : null);
});

transport.on('close', (client, code) => {
  console.log('close socket', client._socket._handle ? client._socket._handle.fd : null, code);
});

transport.on('error', (client, code) => {
  console.log('error socket', client._socket._handle ? client._socket._handle.fd : null, code);
});

transport.on('message', (client, message) => {

  if (message != '{}'){

    var message = JSON.parse(message);
    console.log('onConnection message', client._socket._handle.fd, message);

    // auth and session create

    if (message.auth && message.auth.userId){

      client.userId = message.auth.userId;
      client.clientId = `${client.userId}-${client._socket._handle.fd}`;
      console.log('Auth', client.clientId);
      clients.add(client.clientId, client);

    } else {

      console.log(new Error(Constants.Errors.AUTH));

    }

  }

});

var jobs = {

  sendMessage: {
    perform: (message, callback) => {

      console.log('Job perform sendMessage', message);
      var targetClients = clients.findByProperty('userId', message.recipient);

      if (targetClients && targetClients.length){

        console.log('send message to', targetClients.length);

        for(var i = 0, len = targetClients.length; i < len; i++ ){

          clients.sendTo(targetClients[i], message.body);

        }

      }

      callback(null, message);

    }
  }

};

TaskFacade.createWorker(config.redis, ['WS_OUTGOING_QUEUE'], jobs, true);