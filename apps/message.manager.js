'use strict';

var config = require('config');
var TaskFacade = require('../modules/task/facade');

var jobs = {

  processMessage: {
    perform: (message, callback) => {
      console.log('Job perform processMessage', message);

      // channel manager
      switch (message.channel){

        case 'USERNOTIFICATION':
          taskManager.set('WS_OUTGOING_QUEUE', 'sendMessage', message);
          break;

      }

      // check behaviours and apply it
      callback(null, message);
    }
  }

};

var taskManager = TaskFacade.createResqueTaskManager();
TaskFacade.createWorker(config.redis, ['INCOMING_QUEUE'], jobs, true);