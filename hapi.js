/**
 * Created by mike.killeen on 10/7/2016.
 */
const Hapi = require('hapi');
const Blipp = require('blipp');
const Joi = require('joi');
const server = new Hapi.Server();

server.connection({
    port:1337,
    host:'localhost'
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
        handler: function(request,reply) {
            const name = request.params.name;
            return reply({message: `Hello ${name}`});
        },
        cache: {
            expiresIn:3600000
        }
    },

});

// Register plugins and such...
server.register(Blipp,(err)=> {
    if(err) {
        throw err;
    }
    server.start((err)=> {
        if(err) {
            throw err;
        }
        console.log(`Server running at ${server.info.uri}`);
    });
});
