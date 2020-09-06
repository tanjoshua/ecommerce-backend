const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product");
};

exports.postAddProduct = (req, res, next) => {
  console.log("request body:");
  console.log(req.body);
  const product = new Product(
    req.body.title,
    req.body.imageURL,
    req.body.price,
    req.body.description
  );
  product.save();

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // pass in a callback function that received the products
  Product.fetchAll((products) => {
    res.render("shop", { products });
  });
};

// get product by id
exports.getProductByID = (req, res, next) => {
  const productID = req.params.productID;
  console.log(productID);
  Product.getByID(productID, (product) => console.log(product));
  res.render("product-details");
};

exports.getCart = (req, res, next) => {
  res.render("cart");
};
