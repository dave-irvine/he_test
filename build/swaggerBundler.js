#!/usr/bin/env node
'use strict';

var RefParser = require('json-schema-ref-parser');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');
var inPath = path.resolve(__dirname, '../swagger/');
var outPath = path.resolve(__dirname, '../build/swagger/');

// Resolve JSON schema refs in the swagger file
RefParser.bundle(inPath + '/swagger.yaml', function (err, schema) {
  if (err) {
    console.error(err);

    // Quit so that npm knows there was a problem
    process.exit(1);
  } else {
    /*
     * paths/index.yaml provides an array of $refs, but we need these to be a map
     * Writing them as a map in paths/index.yaml is not possible because we want
     * the $ref'd files to be able to contain multiple paths.
     */

    var mappedPaths = {};

    _.each(schema.paths, function (path) {
      _.each(path, function (spec, mappedPath) {
        mappedPaths[mappedPath] = spec;
      });
    });

    schema.paths = mappedPaths;

    mkdirp.sync(outPath);
    fs.writeFileSync(outPath + '/bundled.json', JSON.stringify(schema));
  }
});