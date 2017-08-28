const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);
const collections = {};

fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file) => {
  const collection = require(path.join(__dirname, file));
  collections[collection.name] = collection;
});

module.exports = collections;
