#!/usr/bin/env node

const RefParser = require('json-schema-ref-parser');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const inPath = path.resolve(__dirname, '../swagger/');
const outPath = path.resolve(__dirname, '../build/swagger/')

// Resolve JSON schema refs in the swagger file
RefParser.bundle(inPath + '/swagger.yaml', (err, schema) => {
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

    const mappedPaths = {};

    _.each(schema.paths, (path) => {
      _.each(path, (spec, mappedPath) => {
        mappedPaths[mappedPath] = spec;
      });
    });

    schema.paths = mappedPaths;

    mkdirp.sync(outPath);
    fs.writeFileSync(outPath + '/bundled.json', JSON.stringify(schema));
  }
});