'use strict';

var RestTransport = require('./rest');
var WSTransport = require('./ws');

module.exports = class TransportFacade {

  static createRestTransport(){
    return new RestTransport();
  }

  static initTransport(transport, routes, config){

    if (routes)
      transport.use(routes);

    if (config)
      transport.run(config);

  }

  static createAndInitRestTransport(routes, config){

    var transport = this.createRestTransport();
    this.initTransport(transport, routes, config);

    return transport;
  }

  static createWSTransport(){
    return new WSTransport();
  }

  static createAndInitWSTransport(routes, config){

    var transport = this.createWSTransport();
    this.initTransport(transport, routes, config);

    return transport;
  }

};