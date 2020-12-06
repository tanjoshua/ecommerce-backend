const Cart = require("./cart");
const getDB = require("../utils/database").getDB;
const mdb = require("mongodb");

let products = [];
let newID = 1;

module.exports = class Product {
  constructor(title, imageURL, description, price, id) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
    this._id = id;
  }

  // function to save product
  save() {
    const db = getDB();
    if (this._id) {
      return db
        .collection("products")
        .updateOne({ _id: new mdb.ObjectID(this._id) }, { $set: this });
    }
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => console.log(result));
  }

  // fetch all products and pass it to a callback
  static fetchAll() {
    const db = getDB();
    return db
      .collection("products")
      .find() // find returns a cursor
      .toArray();
  }

  // get a product by id
  static getByID(prodID) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new mdb.ObjectID(prodID) })
      .next();
  }

  // delete by ID
  static deleteByID(id) {
    const product = products.find((product) => product.id == id);
    // remove from cart
    Cart.deleteFromCart(id, product.price);
    products = products.filter((product) => product.id != id);
  }
};
