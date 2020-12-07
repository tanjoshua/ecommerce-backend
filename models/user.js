const getDB = require("../utils/database").getDB;
const mdb = require("mongodb");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  static findByID(userID) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new mdb.ObjectID(userID) });
  }
}

module.exports = User;
