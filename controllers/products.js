const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add product",
    editing: false,
    loggedIn: req.session.loggedIn,
  });
};

exports.getEditProduct = (req, res, next) => {
  const productID = req.params.productID;
  const edit = req.query.edit;
  Product.findById(productID).then((product) => {
    res.render("edit-product", {
      pageTitle: "Edit Product",
      editing: edit,
      product,
      loggedIn: req.session.loggedIn,
    });
  });

  /* NATIVE MONGODB DRIVER
  const productID = req.params.productID;
  const edit = req.query.edit;
  Product.getByID(productID).then((product) => {
    res.render("edit-product", {
      pageTitle: "Edit Product",
      editing: edit,
      product,
    });
  });
  */
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    imageURL: req.body.imageURL,
    description: req.body.description,
    price: req.body.price,
    userID: req.user, // mongoose will just pick the id from the user object
  });
  product.save().then(() => {
    res.redirect("/");
  });
  /* NATIVE MONGODB DRIVER
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
  */
};

exports.postEditProduct = (req, res, next) => {
  Product.find(req.body.id)
    .then((product) => {
      product.title = req.body.title;
      product.imageURL = req.body.imageURL;
      product.description = req.body.description;
      product.price = req.body.price;
      return product.save();
    })
    .then(() => res.redirect("/"));

  /* NATIVE MONGODB DRIVER
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
    */
};

exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.body.productID).then(() => res.redirect("/"));

  /* NATIVE MONGODB DRIVER
  Product.deleteByID(req.body.productID).then(() => {
    res.redirect("/");
  });
  */
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .populate('userID') // find and populate lets you choose what data to get
    .then((products) => {
      res.render("shop", {
        products,
        loggedIn: req.session.loggedIn,
      });
    });

  /* NATIVE MONGODB DRIVER
  Product.fetchAll()
    .then((products) => {
      res.render("shop", { products: products });
    })
    .catch((err) => console.log(err));
  */
};

// get product by id
exports.getProductByID = (req, res, next) => {
  const productID = req.params.productID;
  Product.findById(productID).then((product) =>
    res.render("product-details", { product, loggedIn: req.session.loggedIn })
  );

  /* NATIVE MONGODB DRIVER 
  const productID = req.params.productID; 
  Product.getByID(productID).then((product) => {
    res.render("product-details", { product });
  });
  */
};
