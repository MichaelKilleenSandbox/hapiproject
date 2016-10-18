// JavaScript File
const Good = require('good')

const loadGood = {
register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
};

loadGood.register.attributes = {
  name: 'loadGood',
  version: '1.0.0'
};

module.exports = loadGood;