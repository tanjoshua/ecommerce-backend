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
  product.save().then(() => {
    res.redirect("/");
  });
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

exports.deleteProduct = (req, res, next) => {
  Product.deleteByID(req.body.productID);
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // pass in a callback function that received the products
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop", { products: rows });
    })
    .catch((err) => console.log(err));
};

// get product by id
exports.getProductByID = (req, res, next) => {
  const productID = req.params.productID;
  Product.getByID(productID).then(([product]) => {
    res.render("product-details", { product: product[0] });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cartItems, totalPrice) => {
    Product.fetchAll((products) => {
      const allCartItemData = [];
      for (cartItem of cartItems) {
        const productData = products.find((item) => item.id == cartItem.id);
        if (productData) {
          allCartItemData.push({ cartItemData: cartItem, productData });
        }
      }
      res.render("cart", { cartItems: allCartItemData, totalPrice });
    });
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

exports.deleteFromCart = (req, res, next) => {
  Cart.deleteFromCart(req.body.productID, req.body.productPrice);
  res.redirect("/cart");
};
