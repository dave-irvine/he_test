const path = require('path');
const SwaggerHapi = require('swagger-hapi');
const Hapi = require('hapi');
const _ = require('lodash');

const port = process.env.PORT || 10010;

const swaggerConfig = {
  appRoot: __dirname,
  swagger: path.resolve(__dirname, './swagger/') + '/bundled.json',
  configDir: path.resolve(__dirname, '../config/'),
};

const hapiLogger = {
  plugin: {
    register: require('good'),
    options: {
      reporters: {
        console: [{
          module: 'good-console',
        }, 'stdout']
      }
    }
  }
};

const app = new Hapi.Server();
const models = require('./api/models');
const collections = require('./api/collections');

global.models = models;
global.collections = {};

_.each(collections, (Collection) => {
  global.collections[Collection.name] = new Collection();
});

SwaggerHapi.create(swaggerConfig, (err, swaggerHapi) => {
  if (err) {
    throw err;
  }

  app.connection({
    port,
    routes: {
      cors: true,
    }
  });

  app.address = () => {
    return {
      port,
    };
  };

  app.register(hapiLogger.plugin, (hapiLoggerError) => {
    if (hapiLoggerError) {
      return console.error('Failed to load plugin: ', hapiLoggerError);
    }

    app.register(swaggerHapi.plugin, (swaggerHapiError) => {
      if (swaggerHapiError) {
        return console.error('Failed to load plugin: ', swaggerHapiError);
      }

      app.start((hapiErr) => {
        if (hapiErr) {
          return console.error('Failed to start server: ', hapiErr);
        }

        console.info(`Server started at ${app.info.uri}`);
      });
    });
  });
});
