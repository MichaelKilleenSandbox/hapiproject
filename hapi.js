/**
 * Created by mike.killeen on 10/7/2016.
 * Testing creating and using plugins.
 */
const Hapi = require('hapi');
const Blipp = require('blipp');
const Joi = require('joi');
const Inert = require('inert');
const Boom = require('boom');
//const Vision = require('vision');

const server = new Hapi.Server();


/**
 * Setup server connection.
 *
 */
server.connection({
    port: process.env.PORT || 1337,
    host: process.env.IP || 'localhost'
});



// // add “hello world” route
// server.route({
//   method: 'GET',
//   path: '/',
//   handler: function (request, reply) {
//     reply('Hello Future Studio!');
//   }
// });

// Register plugins and such...
server.register(require('./plugins/base-route'), (err) => {
    if (err) {
        throw err;
    }
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at ${server.info.uri}`);
    });
});
