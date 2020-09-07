const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add product", editing: false });
};

exports.getEditProduct = (req, res, next) => {
  const productID = req.params.productID;
  const edit = req.query.edit;
  Product.getByID(productID, (product) => {
    res.render("edit-product", {
      pageTitle: "Edit Product",
      editing: edit,
      product,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageURL,
    req.body.description,
    req.body.price
  );
  product.save();

  res.redirect("/");
};

exports.postEditProduct = (req, res, next) => {
  const product = new Product(
    req.body.id,
    req.body.title,
    req.body.imageURL,
    req.body.description,
    req.body.price
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
  Product.getByID(productID, (product) =>
    res.render("product-details", { product })
  );
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cart) => {
    res.render("cart", { cart });
  });
};

// add to cart
exports.addToCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.getByID(productID, (product) => {
    Cart.addToCart(productID, product.price);
  });
  res.redirect("/cart");
};
