/**
 * Created by mike.killeen on 10/7/2016.
 * Test 123 This is the static page version.
 * A quick change from Code. Bingo
 */
const Hapi = require('hapi');
const Blipp = require('blipp');
const Joi = require('joi');
const Inert = require('inert');
const Path = require('path');
const Boom = require('boom');
//const Vision = require('vision');

const server = new Hapi.Server();

/**
 * Function that will decorate Hapi reply object.
 *
 * @this {???}
 * @return {object} Returns the name.
 */
const hello = function(name) {
    return this.response({
        hello: name
    });
}

/**
 * Add hello function to Hapi reply.
 *
 */
server.decorate('reply', 'hello', hello);

/**
 * Setup server connection.
 *
 */
server.connection({
    port: process.env.PORT || 1337,
    host: process.env.IP || 'localhost'
});

/**
 * Register plugins and such...
 */
server.register([Blipp, Inert], (err) => {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname,'public'),
                listing: true
            }
        }
    });

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Dir: ' + __dirname);
        console.log(`Server running at ${server.info.uri}`);
    });
});

