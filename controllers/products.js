const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", { pageTitle: "Add product", editing: false });
};

exports.getEditProduct = (req, res, next) => {
  const productID = req.params.productID;
  const edit = req.query.edit;
  Product.getByID(productID).then((product) => {
    res.render("edit-product", {
      pageTitle: "Edit Product",
      editing: edit,
      product,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.imageURL,
    req.body.description,
    req.body.price,
    null,
    req.user._id
  );
  product.save().then(() => {
    res.redirect("/");
  });
};

exports.postEditProduct = (req, res, next) => {
  Product.getByID(req.body.id)
    .then((product) => {
      const updatedProduct = new Product(
        req.body.title,
        req.body.imageURL,
        req.body.description,
        req.body.price,
        req.body.id
      );
      return updatedProduct.save();
    })
    .then(() => {
      res.redirect("/");
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteByID(req.body.productID).then(() => {
    res.redirect("/");
  });
};

exports.getProducts = (req, res, next) => {
  // pass in a callback function that received the products
  Product.fetchAll()
    .then((products) => {
      res.render("shop", { products: products });
    })
    .catch((err) => console.log(err));
};

// get product by id
exports.getProductByID = (req, res, next) => {
  const productID = req.params.productID;
  Product.getByID(productID).then((product) => {
    res.render("product-details", { product });
  });
};

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
  Cart.deleteFromCart(req.body.productID, req.body.productPrice);
  res.redirect("/cart");
};
