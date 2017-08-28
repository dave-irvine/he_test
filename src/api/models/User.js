class User {
  constructor(details) {
    this.Collection = global.collections['Users'];

    this.email = details.email;
    this.forename = details.forename;
    this.surname = details.surname;
    this.created = Date.now();
    this.id = this.Collection.nextID();
  }

  toJSON() {
    const { email, forename, surname, created, id } = this;

    return {
      email,
      forename,
      surname,
      created,
      id
    };
  }
}

module.exports = User;
