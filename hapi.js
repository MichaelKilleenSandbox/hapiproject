/**
 * Created by mike.killeen on 10/7/2016.
 * Testing creating and using plugins.
 */
const Hapi = require('hapi');
const Blipp = require('blipp');
const BaseRoute = require('./plugins/base-route');
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


// Register plugins and such...
server.register([BaseRoute,Blipp], (err) => {
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
