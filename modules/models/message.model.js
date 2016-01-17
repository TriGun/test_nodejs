'use strict';

var Constants = require('../constants');

module.exports = class MessageModel {

  static create(raw){

    var message = {};

    if (raw.channel)
      message.channel = raw.channel;

    if (raw.sender)
      message.sender = raw.sender;

    if (raw.recipient)
      message.recipient = Number(raw.recipient);

    if (raw.body)
      message.body = raw.body;

    return message;
  }

  static validate(message){

    var errors = [];

    if (!message.channel)
      errors.push(new Error(Constants.Errors.MESSAGE_MODEL_CHANNEL));

    if (!message.recipient)
      errors.push(new Error(Constants.Errors.MESSAGE_MODEL_RECIPIENT));

    return errors.length ? errors : null;

  }

};