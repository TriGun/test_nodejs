'use strict';

var config = require('config');
var TransportFacade = require('../modules/transport/facade');
var TaskFacade = require('../modules/task/facade');
var MessageModel = require('../modules/models/message.model');

var router = (app) => {

  app.get('/sendMessage/', (req, res) => {

    var message = MessageModel.create(req.query);
    var err = MessageModel.validate(message);

    if (err){
      console.log('err', err);
      res.send(JSON.stringify({ status: 'FAIL', err: err[0].message}));
    } else {
      console.log('SET INCOMING_QUEUE', message);
      taskManager.set('INCOMING_QUEUE', 'processMessage', message);
      res.send(JSON.stringify({ status: 'OK' }));
    }

  })

};

var taskManager = TaskFacade.createResqueTaskManager();
var transport = TransportFacade.createAndInitRestTransport(router, config.apiGateway);