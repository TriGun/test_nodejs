'use strict';

module.exports = (driverName) => {

  return require('./' + driverName);

};