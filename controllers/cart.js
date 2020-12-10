const Product = require("../models/product");

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    res.render("cart", { cartItems: cart, totalPrice });
  });
};

// add to cart
exports.addToCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.getByID(productID)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

exports.deleteFromCart = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.productID).then(() => {
    res.redirect("/cart");
  });
};
