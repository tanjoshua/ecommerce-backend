const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  // check if item already in cart
  const productIndex = this.cart.items.findIndex(
    (p) => p.productID.toString() == product._id.toString()
  );

  // add to quantity or insert new cart item
  const cartItems = [...this.cart.items];
  if (productIndex >= 0) {
    cartItems[productIndex].quantity += 1;
  } else {
    cartItems.push({
      productID: product._id,
      quantity: 1,
    });
  }

  this.cart = {
    items: cartItems,
  };

  return this.save();
};

userSchema.methods.deleteItemFromCart = function (productID) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productID.toString() != productID.toString()
  );

  this.cart.items = updatedCartItems;

  return this.save();
};

module.exports = mongoose.model("User", userSchema);

/* MONGODB NATIVE DRIVER
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
  }

  deleteItemFromCart(productID) {
    const db = getDB();
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productID.toString() != productID.toString()
    );

    return db
      .collection("users")
      .updateOne(
        { _id: new mdb.ObjectID(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDB();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        db.collection("users").updateOne(
          { _id: new mdb.ObjectID(this._id) },
          { $set: { cart: this.cart } }
        );
      });
  }

  getOrders() {
    const db = getDB();
    return db
      .collection("orders")
      .find({ "user._id": new mdb.ObjectID(this._id) })
      .toArray();
  }

  static findByID(userID) {
    const db = getDB();
    return db.collection("users").findOne({ _id: new mdb.ObjectID(userID) });
  }
}

module.exports = User;
*/
