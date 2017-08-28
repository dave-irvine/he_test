function create(req, res) {
  res.end('create()');
};

function destroy(req, res) {
  res.end('destroy()');
};

function get(req, res) {
  res.end('get()');
};

function list(req, res) {
  res.end('list()');
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
