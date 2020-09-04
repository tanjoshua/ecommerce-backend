const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  // function to save product
  save() {
    products.push(this);
  }

  static fetchAll(cb) {
    return cb(products);
  }
};
