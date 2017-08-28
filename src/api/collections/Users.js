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
}

module.exports = Users;