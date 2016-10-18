const Joi = require('joi');
const Moment = require('moment');
var Good = require('good')

var baseRoutes = {
  register: function (server, options, next) {
    // add “hello world” route
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Hello From APEX! ' + (new Date()));
        // + Moment.format('MMMM do YYYY h:mm:ss a')
      }
    });

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

    next();
  }
};

baseRoutes.register.attributes = {
  name: 'base-routes',
  version: '1.0.0'
};

module.exports = baseRoutes;

// https://futurestud.io/tutorials/hapi-create-your-own-custom-plugin

