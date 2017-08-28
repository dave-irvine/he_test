'use strict';

var path = require('path');
var SwaggerHapi = require('swagger-hapi');
var Hapi = require('hapi');

var port = process.env.PORT || 10010;
var swaggerConfig = {
  appRoot: __dirname,
  swagger: path.resolve(__dirname, './swagger/') + '/bundled.json',
  configDir: path.resolve(__dirname, '../config/')
};
var hapiLogger = {
  plugin: {
    register: require('good'),
    options: {
      reporters: {
        console: [{
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
};

var app = new Hapi.Server();

SwaggerHapi.create(swaggerConfig, function (err, swaggerHapi) {
  if (err) {
    throw err;
  }

  app.connection({
    port: port,
    routes: {
      cors: true
    }
  });

  app.address = function () {
    return {
      port: port
    };
  };

  app.register(hapiLogger.plugin, function (error) {
    app.register(swaggerHapi.plugin, function (error) {
      if (error) {
        return console.error('Failed to load plugin: ', err);
      }

      app.start(function (hapiErr) {
        if (hapiErr) {
          return console.error('Failed to start server: ', hapiErr);
        }

        console.info('Server started at ' + app.info.uri);
      });
    });
  });
});