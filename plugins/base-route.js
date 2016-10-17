var baseRoutes = {
  register: function (server, options, next) {
    // add “hello world” route
    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('Hello From APEX!');
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

