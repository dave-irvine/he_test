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
  const userId = req.swagger.params.userId.value;
  const user = Collection.fetch(userId);

  if (user) {
    Collection.destroy(userId);
    res.end('User removed.');
  } else {
    res.statusCode = 404;
    res.end('No such user.');
  }
};

function get(req, res) {
  const userId = req.swagger.params.userId.value;
  const user = Collection.fetch(userId);

  if (user) {
    res.json(user.toJSON());
  } else {
    res.statusCode = 404;
    res.end('No such user.');
  }
};

function list(req, res) {
  const users = Collection.list();

  const usersJSON = _.map(users, (user) => {
    return user.toJSON();
  });

  res.json(usersJSON);
};

function update(req, res) {
  const userDetails = req.swagger.params.user.value;
  const userId = req.swagger.params.userId.value;
  const user = Collection.fetch(userId);

  Object.assign(user, userDetails);

  Collection.update(userId, user);

  res.json(user.toJSON());
};

module.exports = {
  create,
  destroy,
  get,
  list,
  update,
};
