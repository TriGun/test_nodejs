'use strict';

var Transport = require('./transport');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = class RestTransport extends Transport {

  constructor(){
    super();
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

  }

  run(options){

    this.server = this.app.listen(options.init.port, () => {

      var host = this.server.address().address;
      var port = this.server.address().port;

      console.log(`App listening at http://${host}:${port}`)

    });

    return this;

  }

};