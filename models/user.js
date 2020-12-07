const getDB = require("../utils/database").getDB;
const mdb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const db = getDB();
    const productIndex = this.cart.items.findIndex((p) => p._id == product._id);

    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    return db
      .collection("users")
      .updateOne(
        { _id: new mdb.ObjectID(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findByID(userID) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new mdb.ObjectID(userID) });
  }
}

module.exports = User;
