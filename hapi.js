/**
 * Created by mike.killeen on 10/7/2016.
 * Testing creating and using plugins.
 */
const Hapi = require('hapi');
const Blipp = require('blipp');
const BaseRoute = require('./plugins/base-route');
const Good = require('good')
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


const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }/*, {
            module: 'good-file',
            args: ['./test/fixtures/awesome_log']
        }*/],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
    }
};

const GoodRegistration = {
  register: Good, options
};


// Register plugins and such...
server.register([BaseRoute, Blipp, GoodRegistration], (err) => {
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
