'use strict';

var EventEmitter = require('events').EventEmitter;

module.exports = class Transport extends EventEmitter {

  constructor(){
    super();
  }

  use(middleware){

    if (typeof middleware === 'function')
      middleware(this.app);

    return this;
  }

  run(options){

    return this;

  }

};