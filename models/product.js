const products = [];
let id = 1;

module.exports = class Product {
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
    this.id = id;
    id++;
  }

  // function to save product
  save() {
    products.push(this);
  }

  static fetchAll(cb) {
    return cb(products);
  }
};
