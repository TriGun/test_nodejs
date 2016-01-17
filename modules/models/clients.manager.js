'use strict';

module.exports = class ClientsManager{

  constructor(){

    this.list = new Map();

  }

  add(userId, client){

    this.list.set(userId, client);

  }

  findByProperty(property, value){

    var clients = [];

    for(var entry of this.list){

      if (entry[1][property] && entry[1][property] === value)
        clients.push(entry[1]);

    }

    return clients.length ? clients : null;
  }

  broadcast(message){

    for (let i = 0, len = this.clients.length; i < len; i++ ) {
      if (this.clients[i].readyState === this.clients[i].OPEN) {
        this.clients[i].send(JSON.stringify(message));
      }
    }

  }

  sendTo(client, message){

    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(message));
    }

  }

};