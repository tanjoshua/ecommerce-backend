const Cart = require("./cart");
const db = require("../utils/database");

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
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageURL, this.description]
    );
  }

  // fetch all products and pass it to a callback
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  // get a product by id
  static getByID(id, cb) {
    reutrn db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  // delete by ID
  static deleteByID(id) {
    const product = products.find((product) => product.id == id);
    // remove from cart
    Cart.deleteFromCart(id, product.price);
    products = products.filter((product) => product.id != id);
  }
};
