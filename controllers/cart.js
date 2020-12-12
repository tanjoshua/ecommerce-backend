const Product = require("../models/product");

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productID")
    .execPopulate()
    .then((user) => {
      let totalPrice = 0;
      user.cart.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      res.render("cart", { cartItems: user.cart.items, totalPrice });
    });

  /* NATIVE MONGODB DRIVER
  req.user.getCart().then((cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    res.render("cart", { cartItems: cart, totalPrice });
  });
  */
};

// add to cart
exports.addToCart = (req, res, next) => {
  const productID = req.body.productID;
  Product.findById(productID)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => res.redirect("/cart"));

  /* NATIVE MONGODB DRIVER
  const productID = req.body.productID;
  Product.getByID(productID)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
    */
};

exports.deleteFromCart = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.productID).then(() => {
    res.redirect("/cart");
  });
};

exports.postOrder = (req, res, next) => {
  if (req.user.cart.items.length > 0)
    req.user.addOrder().then(() => res.redirect("/orders"));
  else next();
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    res.render("orders", { orders });
  });
};
