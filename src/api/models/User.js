class User {
  constructor(details) {
    this.email = details.email;
    this.forename = details.forename;
    this.surname = details.surname;
    this.created = Date.now();
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
