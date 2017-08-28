class Users {
  constructor() {
    this.Model = global.models['User'];

    this.users = {};
    this.lastID = 0;
  }

  store(instance) {
    instance.id = ++this.lastID;
    this.users[instance.id] = instance;
  }

  list() {
    return this.users;
  }

  fetch(userId) {
    return this.users[userId];
  }

  destroy(userId) {
    delete this.users[userId];
  }

  update(userId, user) {
    this.users[userId] = user;
  }
}

module.exports = Users;
