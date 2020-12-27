const Product = require("../models/product");
const fs = require("fs");

exports.getAddProduct = (req, res, next) => {
  res.render("edit-product", {
    pageTitle: "Add product",
    editing: false,
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
  // error if no image
  let filePath;
  if (!req.file) {
    filePath = "";
  } else {
    filePath = req.file.path;
  }

  const product = new Product({
    title: req.body.title,
    imageURL: filePath, // multer stores picture in file
    description: req.body.description,
    price: req.body.price,
    userID: req.user, // mongoose will just pick the id from the user object
  });
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
  Product.findById(req.body.id).then((product) => {
    // check if user allowed to edit
    if (product.userID.toString() != req.user._id.toString()) {
      return res.redirect("/");
    }

    product.title = req.body.title;
    if (req.file) {
      fs.unlink(product.imageURL, (err) => {
        if (err) throw err;
      }); // delete old file
      product.imageURL = req.file.path; // only change pic if file selected
    }
    product.description = req.body.description;
    product.price = req.body.price;
    return product
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });

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
  // find product
  Product.findById(req.body.productID)
    .then((product) => {
      if (!product) {
        return new Error("product not found");
      }

      fs.unlink(product.imageURL, (err) => {
        if (err) {
          throw err;
        }
      }); // delete old file

      // ensure that product is owned by user
      Product.deleteOne({ _id: req.body.productID, userID: req.user._id }).then(
        () => {
          res.redirect("/");
        }
      );
    })
    .catch((err) => {
      return next(new Error(err));
    });

  /* NATIVE MONGODB DRIVER
  Product.deleteByID(req.body.productID).then(() => {
    res.redirect("/");
  });
  */
};

exports.getProducts = (req, res, next) => {
  const page = req.query.page; // get page from query
  let itemCount;

  Product.find()
    .countDocuments()
    .then((productCount) => {
      itemCount = productCount;
      return Product.find()
        .skip((page - 1) * 2)
        .limit(2); // skip and limit implements pagination
      // .populate('userID') // find and populate lets you choose what data to get
    })
    .then((products) => {
      res.render("shop", {
        products,
        itemCount,
        pageCount: Math.ceil(itemCount / 2),
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
    res.render("product-details", { product })
  );

  /* NATIVE MONGODB DRIVER 
  const productID = req.params.productID; 
  Product.getByID(productID).then((product) => {
    res.render("product-details", { product });
  });
  */
};
