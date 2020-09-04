const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product");
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  products.push({ title: req.body.title });

  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  console.log(products);
  //__dirnames gives the path to the directory of the file, join gives us the right path based on OS
  res.render("shop", { products });
};
