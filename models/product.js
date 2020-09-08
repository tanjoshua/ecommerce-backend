const Cart = require("./cart");

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
    if (this.id) {
      //replace
      const productIndex = products.findIndex(
        (product) => product.id == this.id
      );
      products[productIndex] = this;
    } else {
      // save new product
      this.id = newID;
      newID++;
      products.push(this);
    }
  }

  // fetch all products and pass it to a callback
  static fetchAll(cb) {
    return cb(products);
  }

  // get a product by id
  static getByID(id, cb) {
    const product = products.find((prod) => prod.id == id);
    cb(product);
  }

  // delete by ID
  static deleteByID(id) {
    const product = products.find((product) => product.id == id);
    // remove from cart
    Cart.deleteFromCart(id, product.price);
    products = products.filter((product) => product.id != id);
  }
};
