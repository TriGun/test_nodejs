'use strict';

var Task = require('./task');
var NR = require("node-resque");
var Config = require('config');

module.exports = class ResqueTask extends Task{

  constructor(jobs){

    super();

    this.connect = false;
    var jobs = jobs || {};

    this.queue = new NR.queue({connection: Config.redis}, jobs);
    this.queue.on('error', function(error){ console.log(error); });

    this.queue.connect((function(){
      this.connect = true;
    }).bind(this));

  }

  set(queueName, jobName, taskData){

    if (this.connect) {
      this.queue.enqueue(queueName, jobName, taskData);
    }

  }

};