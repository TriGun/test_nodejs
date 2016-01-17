'use strict';

var Transport = require('./transport');
var RestTransport = require('./rest');
var ws = require('ws');

module.exports = class WSTransport extends RestTransport {

  constructor(){
    super();
  }

  use(app){

    super.use(app);

    return this;

  }

  run(options){

    super.run(options);
    this.ws = new ws.Server({server: this.server});

    var host = this.server ? this.server.address().address || 'localhost' : 'localhost';
    var port = this.server.address().port;

    console.log(`App listening at ws://${host}:${port}`);

    this.ws.on('connection', (client) => {

      //this.app.mm.onConnection(client);

      this.emit('connection', client);

      client.on('message', (msg) => {

        //this.app.mm.onMessage(client, msg);
        this.emit('message', client, msg);

      });

      client.on('close', (code) => {

        //this.app.mm.onClose(client, code);
        this.emit('close', client, code);

      });

      client.on('error', (error) => {

        //this.app.mm.onError(client, error);
        this.emit('error', client, error);

      });


    });


    return this;
  }

};