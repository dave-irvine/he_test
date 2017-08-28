const _ = require('lodash');

const Model = global.models['User'];
const Collection = global.collections['Users'];

function create(req, res) {
  const userDetails = req.swagger.params.user.value;
  const user = new Model(userDetails);

  Collection.store(user);

  res.json(user.toJSON());
};

function destroy(req, res) {
  res.end('destroy()');
};

function get(req, res) {
  res.end('get()');
};

function list(req, res) {
  const users = Collection.list();

  const usersJSON = _.map(users, (user) => {
    return user.toJSON();
  });

  res.json(usersJSON);
};

function update(req, res) {
  res.end('update()');
};

module.exports = {
  create,
  destroy,
  get,
  list,
  update,
};
