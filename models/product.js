const products = [];
let id = 1;

module.exports = class Product {
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
    this.id = id;
    console.log(this.id);
    id++;
  }

  // function to save product
  save() {
    products.push(this);
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
};
