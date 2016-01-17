'use strict';

var ResqueTaskManager = require('./resque');
var NR = require("node-resque");

module.exports = class TaskFacade {

  static createResqueTaskManager(jobs){
    return new ResqueTaskManager(jobs);
  }

  static createWorker(connectionConfig, queues, jobs, workerCleanup){

    var worker = new NR.multiWorker({
      connection: connectionConfig,
      queues: queues,
      minTaskProcessors: 1,
      maxTaskProcessors: 100,
      checkTimeout: 10,
      maxEventLoopDelay: 10,
      toDisconnectProcessors: true
    }, jobs);

    workerCleanup = workerCleanup || true;

    worker.start();
    //worker.connect(() => {
    //  if (workerCleanup)
    //    worker.workerCleanup();
    //  worker.start();
    //});

  }

};