class Users {
  constructor() {
    this.Model = global.models['User'];

    this.users = {};
    this.lastID = 0;
  }

  nextID() {
    return this.lastID + 1;
  }

  store(instance) {
    this.users[this.nextID()] = instance;
    this.lastID++;
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
