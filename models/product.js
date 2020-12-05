const Cart = require("./cart");
const getDB = require("../utils/database").getDB;

let products = [];
let newID = 1;

module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  // function to save product
  save() {
    const db = getDB();
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
  static getByID(id, cb) {}

  // delete by ID
  static deleteByID(id) {
    const product = products.find((product) => product.id == id);
    // remove from cart
    Cart.deleteFromCart(id, product.price);
    products = products.filter((product) => product.id != id);
  }
};
