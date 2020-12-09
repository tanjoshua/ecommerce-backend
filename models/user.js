const getDB = require("../utils/database").getDB;
const mdb = require("mongodb");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []} cartitem: {productID, quantity}
    this._id = id;
  }

  save() {
    const db = getDB();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const db = getDB();
    const productIndex = this.cart.items.findIndex(
      (p) => p.productID.toString() == product._id.toString()
    );

    let quantity = 1;

    // add to quantity or insert new cart item
    const cartItems = [...this.cart.items];
    if (productIndex >= 0) {
      cartItems[productIndex].quantity += 1;
    } else {
      cartItems.push({
        productID: new mdb.ObjectID(product._id),
        quantity: 1,
      });
    }

    const updatedCart = {
      items: cartItems,
    };

    return db
      .collection("users")
      .updateOne(
        { _id: new mdb.ObjectID(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDB();
    const productIDs = this.cart.items.map((product) => product.productID);
    return db
      .collection("products")
      .find({ _id: { $in: productIDs } })
      .toArray()
      .then((products) =>
        products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find(
              (item) => item.productID.toString() == p._id.toString()
            ).quantity,
          };
        })
      );

    return this.cart;
  }

  static findByID(userID) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new mdb.ObjectID(userID) });
  }
}

module.exports = User;
