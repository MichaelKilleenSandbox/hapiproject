/**
 * Created by mike.killeen on 10/7/2016.
 */
const Hapi = require('hapi');
const Blipp = require('blipp');
const Joi = require('joi');
const Inert = require('inert');
const Boom = require('boom');
//const Vision = require('vision');

const server = new Hapi.Server();

const hello = function(name) {
    return this.response({
        hello: name
    });
}

// Defines a new handler for routes on this server.
server.decorate('reply', 'hello', hello);

server.connection({
    port: process.env.PORT || 1337,
    host: process.env.IP || 'localhost'
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(request, reply) {
        return reply.hello(request.params.name);
    }
});

// Routes
server.route({
    method: 'GET',
    path: '/hello/{name}',
    config: {
        description: 'Return an object with hello message',
        validate: {
            params: {
                name: Joi.string().min(3).required()
            }
        },
        pre: [],
        handler: function(request, reply) {
            const name = request.params.name;
            return reply({
                message: `Hello ${name}`
            });
        },
        cache: {
            expiresIn: 3600000
        }
    }
});

server.route({
    method: 'GET',
    path: '/partslookup',
    config: {
        description: 'Return an object with hello message',
        pre: [],
        handler: function(request, reply) {
            reply.file('testdata.json');
        },
        cache: {
            expiresIn: 3600000
        }
    }
});

server.route({
    method: '*',
    path: '/{p*}',
    handler: function(request, reply) {
        return reply('The page was not found:' + request.path).code(404);
    }
});

// Register plugins and such...
server.register([Blipp, Inert], (err) => {
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
